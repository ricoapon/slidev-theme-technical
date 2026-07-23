# Technical Presentation Style Guide

A standalone, reusable style guide for building **technical** slide decks with Slidev — the kind
of talk where you show code, commands, architecture and systems. It is written so that any
assistant or person can turn it into a Slidev theme (`slidev-theme-technical`) **with no prior
context** — every preference is stated explicitly.

The goal: **one durable, opinionated system** so decks don't get redesigned from scratch each
time. The constraints are what make the decks feel consistent and fast to build. The theme is a
*framework* you drop into every future deck: choose an accent, write content, done.

The defining idea: **framed developer surfaces do the work that photos do in other decks.** A
sparse slide is filled not with imagery but with a terminal, a code window, or a diagram. A
technical audience reads that familiar developer chrome as meaningful, so a minimal slide feels
substantial instead of empty. Those surfaces come from the theme itself — styled code blocks and a
couple of small components — so you *compose* slides from them rather than hand-building chrome.

---

## 0. Before you build — confirm the per-deck choices

Most of this guide is fixed. A few things are decided fresh per deck. If the user hasn't stated
them, **ask first** (and if they don't care, pick the recommended default and say which):

1. **Accent color** — a single hex value, the deck's signature hue. Default `#BD93F9` (purple).
   (See §3.)
2. **Prompt glyph** — the accent glyph placed before titles: `❯` (default), `$`, or `#`. Set once
   via `themeConfig.glyph`. (See §3/§4.)
3. **Delivery** — offline (bundle fonts locally, the default) or online (CDN fonts, remote embeds
   allowed)? (See §7.)

Everything else in this guide is fixed and does not need to be asked about.

---

## 1. The essence (the non-negotiables)

If a deck follows only these five rules, it already looks right:

1. **Monochrome base, a single accent color.** Near-black + white/gray as the foundation, plus
   **one** accent color. That accent may appear generously — a colored `$`/`❯`/`#` glyph before
   titles, an active line, a highlighted token, a diagram node — as long as it is always the *same
   one color*. The rule is "one accent hue," not "one accent per slide." Never a second hue.
2. **Everything is monospace.** One typeface — **JetBrains Mono** — for titles, body, code and
   chrome. The mono grid *is* the aesthetic. No sans-serif companion.
3. **One idea per slide, almost no text.** A big title and a few short phrases. If it reads like a
   paragraph, it belongs in the spoken delivery, not on the slide.
4. **Framed developer surfaces fill the screen.** Terminals, code windows and diagrams carry the
   meaning and occupy the space. They come from the theme, not from bespoke per-slide markup.
5. **A fixed, small layout vocabulary.** A handful of standard layouts, reused. No bespoke layout
   per slide.

Everything below is the detail behind these five.

---

## 2. What this style is — and is not

**It is:** an editor/terminal aesthetic — calm, precise, confident, a little "IDE at night."
Concretely: a near-black surface, a mono typeface on a generous grid of whitespace, large
confident titles, and a single accent hue running through the deck as small signals (a prompt
caret, an active line, a highlighted token, a focus ring, a colored glyph before a heading). The
impression should be **a clean developer workspace**, not a decorated poster.

**It is not:**

- **Dense, text-heavy, dated slides** — bullet lists stacked to the edges, tiny type, screenshots
  of code pasted as images. This is the main failure mode to avoid.
- **A rainbow.** The accent may appear often, but it is always *one* color. Multiple hues glowing
  on a slide is the thing to avoid — not multiple uses of the single accent.
- **A bespoke-artwork deck.** The budget is "sharp and fast." The framed surfaces exist precisely
  so you don't art-direct each slide.

The aim is to look like a thoughtful engineer's terminal — intentional, without spending a
designer's week on it.

---

## 3. Color

One decision per deck: **accent**. Everything else is fixed.

### The base is dark — always

This style is **dark only**. The near-black surface is what makes it read as "editor/terminal" —
that is the identity, not a switchable mode. There is nothing to configure here and no scheme to
choose; the palette below is fixed.

| Role                | Value     |
|---------------------|-----------|
| Background          | `#0D0E12` |
| Surface / panel     | `#16181D` |
| Primary text        | `#E8E8EA` |
| Secondary text      | `#8A8F98` |
| Faint / comment     | `#5A5F68` |
| Hairlines / borders | `#24262D` |

The background is this **solid color** — that is the entire background. There is no separate
background layer, pattern, gradient, or texture behind the content, and none to configure. The
near-black is a neutral (very slightly cool) so the accent is the only real color on screen.

### The one decision — Accent: a single hex value

The accent is set as **one hex color** — this is the theme input. A hex is more precise and
descriptive than a color name, and it makes any hue available, not just a preset list. Set it
once; it drives every accent in the deck via a CSS variable (§8), so changing that one value
re-skins the whole deck.

**Recommended default: `#BD93F9` (purple).** It fits the technical register, is easy on the eyes,
and reads clearly on the near-black surface. The table below is a menu of good starting values —
all legible on the dark base — but the *input is the hex*, not the name:

| Suggested hue        | Hex       | Feel                                  |
|----------------------|-----------|---------------------------------------|
| **Purple** (default) | `#BD93F9` | Signature default. Technical, modern. |
| Cyan                 | `#8BE9FD` | Cool, precise, "protocol."            |
| Green                | `#50FA7B` | Terminal green. Fresh, "it works."    |
| Blue                 | `#58A6FF` | Calm, trustworthy, neutral.           |
| Amber                | `#E3B341` | Warm, energetic, attention.           |
| Pink                 | `#FF79C6` | Playful, bold.                        |
| Red                  | `#FF5555` | Urgent, high-stakes.                  |

If the user doesn't care, use `#BD93F9` and say so.

> **Avoid an accent that collides with a semantic color.** Green `#50FA7B`, amber `#E3B341` and
> red `#FF5555` above are *identical* to the success, warning and error hues in the semantic set
> below. If the accent equals one of them, the decorative accent and that meaning become the same
> color on screen — a green "info" callout looks like a "tip," a red accent looks like "danger" —
> and the "decoration vs. meaning" distinction the eye relies on breaks down. Prefer an accent
> that is *distinct* from the semantic set (the default purple is). If a deck genuinely wants one
> of these hues as its accent, that is a conscious trade-off the author owns: accept that the
> accent and that one semantic meaning read alike.

### How the accent is used

The accent hue is used **freely and consistently** — this is not a "use it sparingly" style. Good
recurring places for it:

- A colored prompt glyph — `❯` (default), `$`, or `#` — before slide titles and section labels.
  This is a **signature motif** of the theme: titles read like a shell prompt or a comment. The
  glyph is a per-deck choice, set once via `themeConfig.glyph`; it is applied consistently to every
  title automatically.
- The caret/prompt and current path inside terminals.
- The active/highlighted line or token in code.
- The focused node of a diagram, a window's focus ring, underlines, links.

The one discipline: **the *decorative* accent is always the same single hue.** Never introduce a
second decorative accent. Body text and large fills stay monochrome; the accent is for emphasis,
state, identity and the prompt motif.

### Color that carries meaning is not decoration

The single-accent rule governs *decoration* — the part of the deck the eye reads as "the look."
Color that carries **meaning** is a different thing: the audience *decodes* it rather than reading
it as style, so it is allowed and does not count as a second accent. There are three color systems,
and that is the right number:

1. **Monochrome base** — structure (background, text, borders). No meaning.
2. **One decorative accent** — emphasis and identity (above). Always a single hue.
3. **Bounded functional palettes** — the semantic set (below) and syntax highlighting (Shiki,
   further below). Multi-color, but conventional and information-bearing, not decorative.

So most slides read as monochrome + one accent, while code and status still get the colors they
need to be legible.

### The semantic color set (functional; shared across surfaces)

A *small, fixed* set of colors that always mean the same thing. Reused everywhere meaning-color
appears — terminal output, code diffs, callouts, and inline good/bad marks — so the theme adds
color coverage without inventing new hues:

| Meaning         | Color     | Used for                                                        |
|-----------------|-----------|-----------------------------------------------------------------|
| Success / added | `#50FA7B` | `✓`, `+`, passing tests, added diff lines, tip callouts         |
| Error / removed | `#FF5555` | `✗`, `-`, failures, stderr, removed diff lines, danger callouts |
| Warning         | `#E3B341` | warnings, deprecations, warning callouts                        |
| Info            | *accent*  | note/info callouts, neutral emphasis                            |
| Comment / muted | `#5A5F68` | secondary output, timestamps                                    |

These are universal conventions (shell status, `diff` add/remove), not a decorative palette. Tuned
to be legible on the near-black surface.

**Callouts / admonitions** map onto this set — `note`/`info` = accent, `tip` = green, `warning` =
amber, `danger` = red — styled minimally (a colored left rule + label), never a filled block. No
new colors are introduced.

**Categorical color is out of scope.** A diagram or chart that needs N distinct colors (one per
service, one per series) cannot be served by one accent, and a categorical palette would wreck the
monochrome discipline. Distinguish such things with grayscale + shape/position + labels, and put
the accent only on the *focused* element. If a specific talk genuinely needs categorical color,
that is a conscious one-off the deck author owns — not a theme feature.

### Syntax highlighting (Shiki)

Slidev highlights code with **Shiki**. The theme ships a default that matches the surface,
configured in one place:

- Recommended default → `vitesse-dark`: calm, low-saturation highlighting that keeps the code quiet
  and lets the accent stand out.
- Whichever is chosen, it is set **once in the theme**, not per deck. Pick one low-saturation dark
  theme and stay with it — the exact palette matters less than that it doesn't fight the deck's
  single accent.

### Color tokens

The whole color system is exposed as CSS variables so components and code read from one place:

```css
:root {
    --bg: #0D0E12;
    --surface: #16181D;
    --text: #E8E8EA;
    --muted: #8A8F98;
    --faint: #5A5F68;
    --border: #24262D;
    --accent: #BD93F9; /* set per deck as a hex — the deck's one accent hue */
}
```

---

## 4. Typography

- **One typeface: JetBrains Mono.** Everything — titles, body, labels, code, terminal, chrome —
  is JetBrains Mono. It is free and open-source (SIL OFL), the default editor font in IntelliJ,
  designed for reading code (tall lowercase, generous spacing, clear `0/O` `1/l/I`). Ship it
  locally via `@fontsource/jetbrains-mono` (offline-safe) with a `ui-monospace, monospace`
  fallback. **Do not add a sans companion** — the single mono voice is the point.
- **Ligatures are on.** JetBrains Mono's coding ligatures (`=>`, `!=`, `->`, `>=`) are enabled in
  the theme's CSS (`font-feature-settings: "liga", "calt"`). This is a CSS-level styling property
  of the theme, not a per-slide authoring choice — so the theme simply turns them on and keeps
  them on. It is not exposed as a deck config knob.
- **The core rule: big title, tiny support.** Titles are large and confident; supporting text is
  small, short, and in the secondary color. The size contrast *is* the design — even more so in
  mono, where weight variation is limited.
- **Weights:** **Medium/SemiBold (500–600)** for titles, **Regular (400)** for body, and the
  faint color + Regular for captions. Avoid Light — mono light weights get spindly on
  projectors. Avoid Bold walls of text.
- **Sentence case for titles** (not Title Case, not ALL CAPS). Calmer, more modern, and it reads
  like a comment or a commit message. ALL CAPS is allowed only for tiny labels/tags (`DEMO`, `V2`).
- **The prompt-glyph motif:** titles are preceded by an accent-colored glyph — `❯` (default), `$`,
  or `#` — chosen once per deck via `themeConfig.glyph` (§3) and applied to every title.
- **No more than two visible type sizes** on a normal content slide (title + body). Code has its
  own size, set by the surface.
- **Tabular everything.** Because it's mono, numbers and columns align for free — lean into it for
  tables, versions, and metrics.

Suggested scale (rem):

| Token          | Size    | Use                                  |
|----------------|---------|--------------------------------------|
| `--fs-display` | 3.5rem  | cover / statement headline           |
| `--fs-title`   | 2.25rem | slide title                          |
| `--fs-body`    | 1.05rem | body / list lines                    |
| `--fs-code`    | 0.95rem | code & terminal (surface-controlled) |
| `--fs-caption` | 0.8rem  | captions, footer                     |

---

## 5. Layout vocabulary

These cover ~95% of any technical talk. Reach for anything else only for a genuine one-off. The
theme should **ship all of these** so a deck needs no custom layouts.

| Layout      | Use it for…                                              | Content rule                                    |
|-------------|----------------------------------------------------------|-------------------------------------------------|
| `cover`     | Title slide. Deck identity.                              | Title + one line + a subtle prompt/version chip |
| `section`   | Section breaks / transitions (the "breath" slides)       | Big number or label + 2–5 word title, centered  |
| `statement` | One punchy claim                                         | 3–6 words centered, nothing else                |
| `default`   | Title + a short list, steps, or a small structure        | Short title + a tight body                      |
| `two-cols`  | Text beside a surface (terminal / code window / diagram) | ≤4 short lines one side, a surface the other    |
| `full`      | A single surface filling the screen (the "hero" mode)    | One terminal, code window or diagram, no body   |
| `center`    | A diagram or single figure that wants to be centered     | Short title + the figure                        |

`two-cols` and `full` are the technical workhorses. Alternate which side the surface sits on so
runs of `two-cols` don't feel mechanical.

There is **no dedicated closing layout.** A "thanks / links" slide is just a `statement` or
`center` with a handle, repo, and one line — build it from those rather than adding a layout for
it. Keeping the vocabulary this small is the point.

**Rhythm matters as much as the layouts.** Alternate *breath* (`section` / `statement` — almost no
text) with *substance* (`default` / `two-cols` / `full`). A run of five code slides in a row is
what makes a technical deck exhausting — break it with a statement or a section divider. Rule of
thumb: **no more than two or three dense surfaces before a breath slide.**

---

## 6. The surfaces that fill the screen

This is the heart of the theme and the answer to "what fills a sparse slide." The set is
deliberately tiny: **styled code blocks (optionally titled), a `<Terminal>`, a `<Cursor>`, and
themed Mermaid diagrams.** They all share one visual language — same mono font, near-black
surface, single accent, one corner radius, hairline borders — so any combination looks native.

### One window chrome, everywhere

There is a **single** window/terminal chrome, used for every surface: a slim title bar with three
small monochrome dots on the left and an optional label (a path or filename). It adds no color
beyond the accent. Everything framed on a slide uses this exact chrome — that consistency is the
theme's visual signature.

### 6.1 Code blocks are framed automatically

The theme styles **every fenced code block** with the window chrome by default. Write an ordinary
Markdown code block and it renders inside the frame, with Shiki highlighting, looking native — no
component, no effort:

````md
```java
record User(String id, String name) {}
```
````

Slidev's native code powers all work as-is inside the frame: line highlighting `{1,3-5|all}`,
**Shiki Magic Move** (```` ```md magic-move ````) for step-by-step code morphs, `<v-clicks>`, and
Monaco for live coding. These are **Slidev features, not the theme's** — the theme only supplies
the frame and guarantees *"when a code block is added, it looks the same."* (Don't lean on line
highlighting in exported/screenshot decks: it auto-scrolls and reads as jumpy when static.)

### 6.2 Naming a code block

To label a surface with a filename or path, add a `title` to the fence — it shows in the chrome
bar. This is a property of the **code block itself**, so no wrapper component is needed:

````md
```java title="UserService.java"
public User findById(String id) { ... }
```
````

(Implemented as a Shiki transformer in the theme; `filename="…"` works as an alias.)

### 6.3 `<Terminal>` — code rendered as shell output

`<Terminal>` is **optional**. A plain `bash` code block is perfectly fine and gets Shiki
highlighting like any other. It is **not a live shell** — it is a styled representation of shell
*output*. Reach for it only when you want shell **semantics** a highlighted block can't express:

- **Prompt lines** start with an accent caret (`❯` by default) and show the typed command.
- **Output lines** are muted; success/error/warning use the semantic colors (§3).
- **Reveal-friendly:** each line can appear on click, so you can step through the output.
- Optionally a blinking cursor (§6.4) sits at the end of the last line.

````md
<Terminal title="~/app">

```bash
❯ pnpm build
✓ built in 1.24s
❯ pnpm test
✗ 1 failed, 42 passed
```

</Terminal>
````

Props: `title`, `prompt` (`❯`/`$`/custom), `reveal` (bind lines to clicks), `cursor` (trailing
blinking cursor), `fill` (grow to the slide for `full` layout).

> **Code block or terminal?** Use a plain (optionally titled) code block for source and for shell
> commands you don't need to color. Use `<Terminal>` when the *output states* — passing/failing,
> added/removed — carry the point and you want them colored. Both share the exact same chrome, so
> they sit side by side without clashing.

### 6.4 `<Cursor>` — blinking cursor

A **blinking block** cursor (`▉`) in the accent color. Use it to end a terminal's active prompt
line, or after a title/statement on an otherwise-empty slide to give it a small sign of life ("the
prompt is waiting"). CSS-only (a keyframed opacity), so it costs nothing and always exports.

It is deliberately unconfigurable in shape and motion: **always a block, always blinking.** A
non-blinking block is just a character you can type yourself, so the component only exists to
provide the blink.

The one setting is `color`, which defaults to the accent:

- `accent` (default) — the deck's accent hue.
- `text` — the near-white foreground color, for a plainer cursor.

A raw hex is accepted but discouraged — the deck sticks to its single accent, so reach for it only
in a genuine one-off.

### 6.5 Diagrams — Mermaid (themed)

Diagrams are supported natively (Mermaid built in; PlantUML available). The theme ships a
**Mermaid theme override** driven by the CSS tokens so nodes are the surface color, text is the
mono font, lines are the hairline color, and the *active/highlighted* node uses the accent.
Author diagrams in fenced ` ```mermaid ` blocks — no component needed. One diagram per slide,
generous spacing.

### The rule that ties it together

> Every sparse slide gets **one** surface. A statement + one terminal. A claim + one diagram. A
> title + one code window. Never two big surfaces competing on the same slide.

(The single accent hue, by contrast, may appear in several places on that slide — see §3.)

---

## 7. Motion, reveal, and delivery

### Motion & reveal

Restraint. Motion should feel like *stepping through a session*, not like animation.

- **Progressive reveal with `v-click` / `<v-clicks>`** to build lists and terminal/code lines one
  step at a time. Default to revealing, not hiding-then-showing everything at once.
- **Line highlighting** `{1|2-4|all}` to walk through code; **Shiki Magic Move** to morph code
  between steps. These are the primary "explain code" tools — prefer them over pasting successive
  full snippets.
- **Slide transition:** one, consistent, quiet — `fade` or `slide-left`. Set once in the theme; do
  not vary per slide.
- The only always-on motion is the **blinking cursor** (§6.4). No bounces, spins, or decorative
  motion.

### Delivery: offline vs. online

- **Offline / venue uncertain (default):** bundle **JetBrains Mono locally** via
  `@fontsource/jetbrains-mono`; the theme's own glyphs (window dots, cursor) are CSS/SVG; Mermaid
  and Shiki render locally already. Never depends on the room's Wi-Fi; always exports clean.
- **Online with reliable internet:** CDN fonts and remote embeds (a live iframe, a hosted image, a
  social post) are fine. Use this only when you know the venue.
- **If unsure, default to offline** — it never fails mid-talk.

(Icons, logos and other project-specific assets are the deck author's job, not the theme's — add
them per project.)

---

## 8. Implementation philosophy: one theme, out-of-the-box

The strong preference is **standardized, out-of-the-box functionality over custom tweaking.** The
theme is the framework; each deck stays clean.

- **Minimize per-deck `styles.css`, custom layouts, and custom components.** The bulk of slides
  should need *none*. They are rare exceptions, not the default tool.
- **Everything comes from the single theme:** the typeface, the dark surface, the accent (as a
  hex input), all standard layouts (§5), the framed code blocks and small surfaces (§6), the
  Shiki + Mermaid theming, and the transition. A deck is **near-zero-config**: choose an accent,
  write content, done.
- **The one knob that changes a deck's feel is the accent hex.** Everything else — layout, type,
  chrome, rhythm — is identical across every deck, which is what keeps them recognizably one
  system while still allowing variety.

The entire per-deck setup lives in the deck's headmatter:

```yaml
---
theme: technical
themeConfig:
  accent: '#BD93F9'          # a single hex value — the deck's one accent hue
  glyph: '❯'                 # the prompt glyph before titles: ❯ (default), $ or #
transition: fade
---
```

**Custom components** follow the same discipline: prefer none. Build one only for the single
diagram or interaction a talk truly hinges on — and build it in the theme's language (near-black +
the one accent, JetBrains Mono, hairline borders, same radius) so it looks native.

Because all of the above is meant to live in *one* place and work out of the box, the natural home
is this **single personal theme** rather than a third-party theme plus per-deck overrides.

---

## 9. Component API cheat-sheet (for the theme build)

A compact target for whoever generates the theme. Keep authoring in Markdown; keep props few. One
window/terminal chrome style throughout.

| Surface       | Key props                                   | Notes                                                                                        |
|---------------|---------------------------------------------|----------------------------------------------------------------------------------------------|
| Code block    | `title="…"` (native fence meta)             | Auto-framed with the window chrome; `title` shows a filename; preserves highlight/magic-move |
| `<Terminal>`  | `title`, `prompt`, `reveal`, `cursor`, `fill` | Same frame; shell semantics — accent caret, semantic output, click-reveal, trailing cursor  |
| `<Cursor>`    | `color` (`accent` default / `text` / hex)   | CSS-only blinking block cursor; always block, always blinks                                  |
| Mermaid theme | (global)                                    | Themed via CSS tokens; focused node (`class X accent`) = accent                              |

Layouts to ship: `cover`, `section`, `statement`, `default`, `two-cols`, `full`, `center` (§5).
Tokens to expose as CSS variables: the color tokens (§3) and the type scale (§4). Per-deck
`themeConfig`: `accent` (hex) and `glyph` (`❯`/`$`/`#`).

---

## 10. Checklists

**Per deck**

- [ ] One accent hex (`#BD93F9` default) chosen up front
- [ ] Delivery (offline default / online) confirmed for the venue
- [ ] Fonts bundled locally (offline) or CDN (online) per the delivery choice
- [ ] No slide is a wall of text
- [ ] Section / statement slides break up the dense surfaces (≤2–3 dense in a row)
- [ ] Little to no custom CSS, layouts, or components

**Per slide**

- [ ] Big title, minimal support text (sentence case; optional accent prompt glyph)
- [ ] Fits one of the standard layouts
- [ ] At most **one** big surface (terminal / code window / diagram)
- [ ] All accent uses are the same single hue — no second color
- [ ] Everything is JetBrains Mono
- [ ] Would still make sense with the body text cut in half
