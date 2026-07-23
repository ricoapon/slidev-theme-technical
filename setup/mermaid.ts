import { defineMermaidSetup } from '@slidev/types'

// Mermaid theming (STYLE_GUIDE §6.5). Base `dark` theme, then the palette is
// pulled toward the theme tokens: surface-colored nodes, mono font, hairline
// lines. The accent for the focused node is themed with themeCSS below (NOT
// external CSS): it is injected as a <style> INSIDE the SVG, which is what makes
// `var(--accent)` resolve and override mermaid's own node styles — proven
// necessary, as an equivalent rule in styles/code.css does not take effect
// (notably in `slidev export`). themeVariables can't express "one highlighted
// node" on its own, hence the extra rule.
export default defineMermaidSetup(() => ({
  theme: 'dark',
  themeVariables: {
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    fontSize: '15px',
    background: '#0d0e12',
    primaryColor: '#16181d',
    primaryBorderColor: '#24262d',
    primaryTextColor: '#e8e8ea',
    secondaryColor: '#16181d',
    tertiaryColor: '#16181d',
    lineColor: '#e8e8ea',
    textColor: '#e8e8ea',
    nodeBorder: '#8a8f98',
    clusterBkg: '#16181d',
    clusterBorder: '#8a8f98',
  },
  // Mark the focused node with `class NodeId accent` and it takes the accent —
  // the one highlighted element, theme-driven (STYLE_GUIDE §6.5).
  themeCSS: `
    .node.accent > rect,
    .node.accent > circle,
    .node.accent > polygon,
    .node.accent > path,
    .node.accent > .basic.label-container {
      stroke: var(--accent) !important;
      stroke-width: 2px !important;
    }
    .node.accent .nodeLabel { color: var(--accent) !important; fill: var(--accent) !important; }
  `,
}))
