// Generates README screenshots from slides.md — one PNG per slide, per mode.
//
// For each color mode (light + dark) it runs `slidev export --format png` into a
// temp dir, then copies the produced images to repo-root screenshots/ under
// semantic names (in slide order). Dark-mode files get a `-dark` suffix.
//
// Some layouts are *mode-invariant* — they render identically in light and dark
// because they use no themed surface/text colors (e.g. `cover`: a full-bleed
// photo, a scrim, and always-white text). Those are exported once (light only),
// so the README can show them a single time instead of two identical copies.
//
// The deck's headmatter pins `colorSchema: light`, which disables Slidev's dark
// toggle — so rather than relying on the export `--dark` flag we export a temp
// copy of the deck with `colorSchema` flipped to `dark`. That renders the real
// dark theme deterministically, independent of CLI-flag semantics.
//
// Discovering the output files by glob (rather than hard-coding Slidev's
// numbering) keeps this resilient to how Slidev names its PNGs.
//
// Usage: npm run screenshots  (requires playwright-chromium — see test/README.md)

import { execSync } from 'node:child_process'
import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  rmSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'screenshots')

// Semantic names, in the order slides appear in slides.md. Keep in sync with the deck.
const names = ['cover', 'image-right', 'center', 'statement', 'image-left', 'default']

// Layouts that render identically in both modes — exported light-only (see top).
const modeInvariant = new Set(['cover'])

mkdirSync(outDir, { recursive: true })

// Exports `entry` to PNGs and copies them into screenshots/ with the given
// filename suffix (e.g. '' for light, '-dark' for dark). `skip` names are
// exported by Slidev but not copied out (used to drop redundant dark copies).
function exportMode(entry, suffix, skip = new Set()) {
  const tmpDir = join(here, `.screenshots-tmp${suffix}`)
  rmSync(tmpDir, { recursive: true, force: true })
  mkdirSync(tmpDir, { recursive: true })

  console.log(`Exporting slides to PNG (${suffix || 'light'})...`)
  // execSync runs through the shell, so `npx` resolves to npx.cmd on Windows
  // and npx on unix. Quote paths in case they contain spaces.
  execSync(`npx slidev export "${entry}" --format png --output "${tmpDir}"`, {
    cwd: here,
    stdio: 'inherit',
  })

  const pngs = readdirSync(tmpDir)
    .filter((f) => f.toLowerCase().endsWith('.png'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (pngs.length !== names.length) {
    throw new Error(
      `Expected ${names.length} slides but Slidev produced ${pngs.length} PNG(s) ` +
        `(${pngs.join(', ') || 'none'}).\n` +
        `Update the names[] array in generate-screenshots.mjs to match slides.md, ` +
        `or check the export output in ${tmpDir}.`,
    )
  }

  pngs.forEach((file, i) => {
    if (skip.has(names[i])) return
    copyFileSync(join(tmpDir, file), join(outDir, `${names[i]}${suffix}.png`))
  })

  rmSync(tmpDir, { recursive: true, force: true })
}

// Light — the deck as authored (all layouts).
exportMode('slides.md', '')

// Dark — a temp copy of the deck with colorSchema flipped. Written alongside
// slides.md so its relative image paths (public/) still resolve.
const darkEntry = join(here, '.slides-dark.md')
const src = readFileSync(join(here, 'slides.md'), 'utf8')
const darkSrc = src.replace(/^colorSchema:.*$/m, 'colorSchema: dark')
if (darkSrc === src) {
  throw new Error('Could not find a `colorSchema:` line in slides.md to flip to dark.')
}
writeFileSync(darkEntry, darkSrc)
try {
  // Dark — skip mode-invariant layouts so we don't write identical -dark copies.
  exportMode('.slides-dark.md', '-dark', modeInvariant)
} finally {
  rmSync(darkEntry, { force: true })
}

const darkCount = names.filter((n) => !modeInvariant.has(n)).length
console.log(`Wrote ${names.length + darkCount} screenshots to ${outDir}:`)
names.forEach((n) =>
  console.log(
    modeInvariant.has(n)
      ? `  screenshots/${n}.png  (both modes — mode-invariant)`
      : `  screenshots/${n}.png  ·  screenshots/${n}-dark.png`,
  ),
)
