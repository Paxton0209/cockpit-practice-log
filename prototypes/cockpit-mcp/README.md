# cockpit-mcp

Give your AI agent the cockpit design guideline, so it stops designing phone apps for the dashboard.

Zero dependencies · Node 18+ · MCP over stdio

## Install

```bash
claude mcp add cockpit -- node /path/to/cockpit-mcp/server.mjs
```

Cursor / other clients: add a stdio server with command `node` and args `["/path/to/cockpit-mcp/server.mjs"]`.

## Tools

| Tool | What it does |
|---|---|
| `cockpit_brief` | Condensed brief to apply before designing any in-car screen |
| `cockpit_guidelines` | Search 79 rules by section, id or text |
| `cockpit_tokens` | Day / Night tokens as JSON or CSS variables (DTCG 2025.10 source) |
| `cockpit_component` | Component specs: size, variants, props, related rules |
| `cockpit_screen` | Screen templates with region coordinates |
| `cockpit_check` | Check a layout and get violations with rule ids and fixes |

Resources: `cockpit://rules`, `cockpit://tokens`, `cockpit://components`. Prompt: `design_cockpit_screen`.

## Data

`data/rules.json`, `data/tokens.json`, `data/components.json` are extracted from the Figma files *Guideline* and *UI/UX Library*. Edit them to fit your brand; the checker reads the same files.

## Test

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node server.mjs
```
