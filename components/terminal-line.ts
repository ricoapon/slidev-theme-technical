// Shared types + line classification for <Terminal> (STYLE_GUIDE §6.3).
//
// A <Terminal> is not a live shell — it is a styled representation of shell
// output. Each raw line is classified by its leading token into one of the
// semantic kinds below, which the CSS then colors. Kept as a pure function
// (separate from the component) so it is trivial to reason about and test.

export type TerminalLineType =
  | 'is-prompt'
  | 'is-success'
  | 'is-error'
  | 'is-warning'
  | 'is-output'

export interface TerminalLine {
  type: TerminalLineType
  /** The accent caret for a prompt line (empty for output lines). */
  caret: string
  /** The line text, with the caret stripped for prompt lines. */
  text: string
}

// The prompt glyphs a leading token is recognised as a command prompt.
const DEFAULT_PROMPTS = ['❯', '$', '#'] as const

// The leading tokens that map onto the semantic colors (STYLE_GUIDE §3).
const SUCCESS = new Set(['✓', '+'])
const ERROR = new Set(['✗', '✕', '✘', '-'])
const WARNING = new Set(['⚠', '!'])

/**
 * Classify one raw output line. `prompt` is the deck's prompt glyph, added to
 * the recognised set so a custom prompt still renders with the accent caret.
 */
export function classifyLine(raw: string, prompt: string): TerminalLine {
  const line = raw.replace(/\s+$/, '')
  const trimmed = line.trimStart()
  const first = trimmed.charAt(0)

  if (first === prompt || (DEFAULT_PROMPTS as readonly string[]).includes(first)) {
    return { type: 'is-prompt', caret: first, text: trimmed.slice(1) }
  }
  if (SUCCESS.has(first)) return { type: 'is-success', caret: '', text: line }
  if (ERROR.has(first)) return { type: 'is-error', caret: '', text: line }
  if (WARNING.has(first)) return { type: 'is-warning', caret: '', text: line }
  return { type: 'is-output', caret: '', text: line }
}
