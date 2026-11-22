import { readFileSync, writeFileSync } from 'node:fs';
const t = readFileSync('web/template.html', 'utf8');
const check = readFileSync('check.mjs', 'utf8').replace('export function', 'function');
const out = t.replace('/*RULES*/', readFileSync('data/rules.json', 'utf8'))
  .replace('/*TOKENS*/', readFileSync('data/tokens.json', 'utf8'))
  .replace('/*LIB*/', readFileSync('data/components.json', 'utf8'))
  .replace('/*CHECK*/', () => check)
  .replace('/*COMPONENTS*/', () => readFileSync('web/components.js', 'utf8'));
writeFileSync('web/index.html', out);
console.log('built', out.length);
