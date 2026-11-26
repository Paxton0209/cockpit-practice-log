# Dashnote

> A notebook on designing car screens with AI — what AI gets wrong, how to fix it, and the prompt that does it.

**Live site:** https://paxton0209.github.io/dashnote/

Dashnote collects real in-car HMI components (Navigation, Settings, Voice & AI, and more) with interactive **Before / After** comparisons, concise design notes, and copy-ready prompts tested against automotive UI guidelines.

## Local Preview

```bash
python3 -m http.server 8000 --directory site
```

Then open `http://localhost:8000` in your browser.

## Repository Structure

| Path | Description |
|---|---|
| `site/` | Interactive Dashnote web app (deployed automatically to GitHub Pages) |
| `docs/00-design-principles.md` | Core aesthetic DNA, Car HMI vs Web scope boundaries, reusable patterns, and anti-patterns |
| `docs/` | Product definition, decisions log, reference deconstruction, card guidelines, and session handoffs |
| `prototypes/cockpit-mcp/` | Zero-dependency MCP server with automotive HMI rules, tokens, and layout checker |
| `before/` | Reference "Before" AI first-draft prototypes |
| `tests/` | Prompt evaluation and component checks |

## License

[MIT](LICENSE)
