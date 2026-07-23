// Generates README screenshots from slides.md — one PNG per slide.
//
// This theme is DARK-ONLY (the near-black surface is the identity, not a
// switchable mode), so there is a single set of screenshots — no light/dark
// pairing. It runs `slidev export --format png` into a temp dir, then copies
// the produced images to repo-root screenshots/ under semantic names, in the
// order the slides appear in slides.md.
//
// Discovering the output files by glob (rather than hard-coding Slidev's
// numbering) keeps this resilient to how Slidev names its PNGs.
//
// Usage: npm run screenshots  (requires playwright-chromium — see test/README.md)

import { execSync } from 'node:child_process'
import { readdirSync, mkdirSync, copyFileSync, rmSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'screenshots')

// Semantic names, in the order slides appear in slides.md. Keep in sync with the deck.
const names = [
  'cover',
  'section',
  'default',
  'code',
  'terminal',
  'two-cols',
  'full',
  'diagram',
  'statement',
  'callouts',
  'table',
]

mkdirSync(outDir, { recursive: true })

const tmpDir = join(here, '.screenshots-tmp')
rmSync(tmpDir, { recursive: true, force: true })
mkdirSync(tmpDir, { recursive: true })

console.log('Exporting slides to PNG...')
// execSync runs through the shell, so `npx` resolves to npx.cmd on Windows
// and npx on unix. Quote paths in case they contain spaces.
execSync(`npx slidev export "slides.md" --format png --output "${tmpDir}"`, {
  cwd: here,
  stdio: 'inherit',
})

const pngs = readdirSync(tmpDir)
  .filter((f) => f.toLowerCase().endsWith('.png'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

if (pngs.length !== names.length) {
  rmSync(tmpDir, { recursive: true, force: true })
  throw new Error(
    `Expected ${names.length} slides but Slidev produced ${pngs.length} PNG(s) ` +
      `(${pngs.join(', ') || 'none'}).\n` +
      `Update the names[] array in generate-screenshots.mjs to match slides.md.`,
  )
}

pngs.forEach((file, i) => {
  copyFileSync(join(tmpDir, file), join(outDir, `${names[i]}.png`))
})

rmSync(tmpDir, { recursive: true, force: true })

console.log(`Wrote ${names.length} screenshots to ${outDir}:`)
names.forEach((n) => console.log(`  screenshots/${n}.png`))
