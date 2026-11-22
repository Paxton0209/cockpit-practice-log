#!/usr/bin/env node
// Cockpit MCP — gives AI agents the cockpit HMI guideline, tokens, components and a layout checker.
// Zero dependencies. Transport: stdio, newline-delimited JSON-RPC 2.0 (MCP 2025-06-18).
import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { checkLayout } from './check.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const load = f => JSON.parse(readFileSync(join(here, 'data', f), 'utf8'));
const RULES = load('rules.json');
const TOKENS = load('tokens.json');
const LIB = load('components.json');
const VERSION = '0.1.0';

const text = s => ({ content: [{ type: 'text', text: typeof s === 'string' ? s : JSON.stringify(s, null, 2) }] });
const fmtRule = r => `[${r.id}] ${r.section} · ${r.key} (${r.severity})\n  ${r.rule}${r.ref ? `\n  ref: ${r.ref}` : ''}`;
const find = (list, name) => list.find(c => c.name === name || (c.aliases || []).includes(name) || (c.library || '').toLowerCase() === String(name).toLowerCase());

function tokensFor(mode, format) {
  const flat = {};
  for (const [group, items] of Object.entries(TOKENS)) {
    if (group.startsWith('$')) continue;
    for (const [k, t] of Object.entries(items)) {
      if (k.startsWith('$')) continue;
      const v = t.$value;
      flat[`${group}-${k}`] = v && typeof v === 'object' && !('fontSize' in v) ? (v[mode] ?? null) : v;
    }
  }
  if (format !== 'css') return flat;
  return `:root[data-mode="${mode}"] {\n` + Object.entries(flat).filter(([, v]) => v != null).map(([k, v]) =>
    typeof v === 'object' ? `  --${k}: ${v.fontSize}/${v.lineHeight || 'normal'} ${v.fontFamily};` : `  --${k}: ${v};`).join('\n') + '\n}';
}

function brief(task = '') {
  const pick = ['FW-01', 'FW-04', 'FW-06', 'FW-07', 'PR-01', 'PR-03', 'PR-04', 'PR-05', 'TY-01', 'IC-06', 'CT-01', 'CT-02', 'CT-03', 'CT-04', 'CT-06', 'GS-01', 'GS-03', 'GS-04', 'GS-05', 'SC-01', 'SC-04', 'SC-05', 'SC-06', 'PT-01', 'PT-03', 'PT-07', 'BG-01', 'BT-01'];
  const rules = RULES.filter(r => pick.includes(r.id)).map(r => `- ${r.rule}${r.ref ? ` (${r.ref})` : ''} [${r.id}]`).join('\n');
  return `# Cockpit design brief${task ? ` — ${task}` : ''}

Canvas: 1600 × 900 key screen (settings pages 1920 × 1200). Two full-bleed surfaces split at 0.382:
scene panel (left, 617 px) shows the car and live results; app panel (right, 983 px) is what the driver touches.
Status bar (80) and Dock (92) float over both. Content starts at y = 96. Provide Day (light) and Night (dark).

Must-follow rules:
${rules}

Process: 1) call cockpit_component for each control you use; 2) bind colors to cockpit_tokens; 3) run cockpit_check on your layout and fix every must-level issue before showing the result.`;
}

const TOOLS = [
  { name: 'cockpit_brief', description: 'Start here. Returns the condensed cockpit HMI design brief (canvas, golden split, bars, must-follow rules, process) to apply before generating any in-car screen.', inputSchema: { type: 'object', properties: { task: { type: 'string', description: 'What you are about to design, e.g. "climate control screen"' } } } },
  { name: 'cockpit_guidelines', description: 'Search the cockpit guideline. Filter by section (Framework, Proportion, Type, Icons, Controls, Grouping and spacing, Component properties, States and color, Patterns from production, Build · …) or free-text query. Returns rules with ids, severity and reference values.', inputSchema: { type: 'object', properties: { query: { type: 'string' }, section: { type: 'string' }, id: { type: 'string' } } } },
  { name: 'cockpit_tokens', description: 'Design tokens (color, size, radius, space, type, state, layout) for Day (light) or Night (dark) mode, as flat JSON or CSS variables.', inputSchema: { type: 'object', properties: { mode: { type: 'string', enum: ['light', 'dark'] }, format: { type: 'string', enum: ['json', 'css'] } }, required: ['mode'] } },
  { name: 'cockpit_component', description: 'Get a component spec (size, variants, props, related rules). Call without name to list all components.', inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'e.g. switch, list-row, toggle-group, button, search, nav-maneuver' } } } },
  { name: 'cockpit_screen', description: 'Get a screen template layout (key-screen-map, settings) with region coordinates.', inputSchema: { type: 'object', properties: { name: { type: 'string' } } } },
  { name: 'cockpit_check', description: 'Check a proposed layout against the cockpit rules. Describe elements with type (row, text, switch, segment, toggle-group, choice, button, icon, icon-button, slider, radio, card, speed, section-header), geometry (x, y, width, height), and optional fontSize, radius/parentRadius/inset, context (row, card, dialog…), inCard, hasSubtitle, hasLeadingIcon, shape, options, steps, state, opacity, color, labelWidth, size, columns {container,gap,n}, children [types]. Returns violations with rule ids and fixes.', inputSchema: { type: 'object', properties: { mode: { type: 'string', enum: ['light', 'dark'] }, screen: { type: 'object', properties: { width: { type: 'number' }, split: { type: 'number' } } }, elements: { type: 'array', items: { type: 'object' } } }, required: ['elements'] } }
];

function callTool(name, a = {}) {
  switch (name) {
    case 'cockpit_brief': return text(brief(a.task));
    case 'cockpit_guidelines': {
      let r = RULES;
      if (a.id) r = r.filter(x => x.id.toLowerCase() === a.id.toLowerCase());
      if (a.section) r = r.filter(x => x.section.toLowerCase().includes(a.section.toLowerCase()));
      if (a.query) { const q = a.query.toLowerCase(); r = r.filter(x => `${x.key} ${x.rule} ${x.ref || ''} ${x.section}`.toLowerCase().includes(q)); }
      return text(r.length ? r.map(fmtRule).join('\n\n') : 'No matching rules. Sections: ' + [...new Set(RULES.map(x => x.section))].join(', '));
    }
    case 'cockpit_tokens': return text(tokensFor(a.mode === 'dark' ? 'dark' : 'light', a.format));
    case 'cockpit_component': {
      if (!a.name) return text(LIB.components.map(c => `${c.name} — ${c.category}${c.size ? ` · ${c.size}` : ''}`).join('\n'));
      const c = find(LIB.components, a.name);
      if (!c) return text(`Unknown component "${a.name}". Call cockpit_component without a name to list them.`);
      return text({ ...c, rules: (c.rules || []).map(id => RULES.find(r => r.id === id)).filter(Boolean).map(r => ({ id: r.id, rule: r.rule, ref: r.ref })) });
    }
    case 'cockpit_screen': {
      if (!a.name) return text(LIB.screens.map(s => s.name).join('\n'));
      return text(find(LIB.screens, a.name) || `Unknown screen. Available: ${LIB.screens.map(s => s.name).join(', ')}`);
    }
    case 'cockpit_check': return text(checkLayout(a, RULES, TOKENS));
  }
  throw Object.assign(new Error(`Unknown tool: ${name}`), { code: -32602 });
}

const RESOURCES = [
  { uri: 'cockpit://rules', name: 'Cockpit rules', mimeType: 'application/json' },
  { uri: 'cockpit://tokens', name: 'Cockpit tokens (DTCG 2025.10)', mimeType: 'application/json' },
  { uri: 'cockpit://components', name: 'Cockpit components and screens', mimeType: 'application/json' }
];
const PROMPTS = [{ name: 'design_cockpit_screen', description: 'Design an in-car screen that follows the cockpit guideline.', arguments: [{ name: 'task', description: 'Screen to design', required: true }] }];

function handle(msg) {
  const { id, method, params = {} } = msg;
  switch (method) {
    case 'initialize': return { protocolVersion: params.protocolVersion || '2025-06-18', capabilities: { tools: {}, resources: {}, prompts: {} }, serverInfo: { name: 'cockpit-mcp', version: VERSION }, instructions: 'Call cockpit_brief before designing any in-car screen, and cockpit_check before presenting it.' };
    case 'ping': return {};
    case 'tools/list': return { tools: TOOLS };
    case 'tools/call': return callTool(params.name, params.arguments);
    case 'resources/list': return { resources: RESOURCES };
    case 'resources/read': {
      const map = { 'cockpit://rules': RULES, 'cockpit://tokens': TOKENS, 'cockpit://components': LIB };
      if (!map[params.uri]) throw Object.assign(new Error('Unknown resource'), { code: -32602 });
      return { contents: [{ uri: params.uri, mimeType: 'application/json', text: JSON.stringify(map[params.uri], null, 2) }] };
    }
    case 'prompts/list': return { prompts: PROMPTS };
    case 'prompts/get': return { messages: [{ role: 'user', content: { type: 'text', text: brief(params.arguments?.task) + `\n\nNow design: ${params.arguments?.task || 'the requested screen'}.` } }] };
    default: if (id === undefined) return undefined; throw Object.assign(new Error(`Method not found: ${method}`), { code: -32601 });
  }
}

const send = o => process.stdout.write(JSON.stringify(o) + '\n');
createInterface({ input: process.stdin }).on('line', line => {
  if (!line.trim()) return;
  let msg; try { msg = JSON.parse(line); } catch { return send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }); }
  if (msg.id === undefined) return; // notification
  try { send({ jsonrpc: '2.0', id: msg.id, result: handle(msg) }); }
  catch (e) { send({ jsonrpc: '2.0', id: msg.id, error: { code: e.code || -32603, message: e.message } }); }
});
