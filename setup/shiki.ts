import { defineShikiSetup } from '@slidev/types'

// Syntax highlighting: one low-saturation dark theme, set once
// in the theme, not per deck. `vitesse-dark` keeps code quiet so the single
// accent stands out. This is dark-only, so both keys point at the dark theme.
//
// The transformer adds native code-block titles: write
//   ```ts title="server.ts"
// and the filename shows in the window chrome bar (rendered by CSS from the
// `data-title` attribute). This is why the theme needs no <Window> component —
// labelling a surface is a property of the code block itself.
export default defineShikiSetup(() => ({
  themes: {
    dark: 'vitesse-dark',
    light: 'vitesse-dark',
  },
  transformers: [
    {
      name: 'code-title',
      pre(node) {
        const raw = (this.options as any)?.meta?.__raw ?? ''
        const match = /(?:title|filename)="([^"]+)"/.exec(raw)
        if (match) node.properties['data-title'] = match[1]
      },
    },
  ],
}))
