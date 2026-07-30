// The signature prompt glyph placed before titles. It is a
// per-deck choice set once via `themeConfig.glyph` — `❯` (default), `$` or `#`.
//
// Returns the value already wrapped in quotes so it is a valid CSS `content`
// string when assigned to the `--prompt-glyph` custom property on a layout
// root. (Slidev injects themeConfig values unquoted, which `content` rejects,
// so the glyph is wired through the layouts rather than a raw CSS variable.)
export function promptGlyph(glyph?: string): string {
  return `'${glyph || '❯'}'`
}
