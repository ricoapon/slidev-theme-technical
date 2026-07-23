<!--
  Terminal — a code block rendered as terminal OUTPUT (STYLE_GUIDE §6.3). It is
  not a live shell; it is a styled representation of a shell session, and it is
  optional: a plain ```bash code block is perfectly fine and gets Shiki
  highlighting. Reach for <Terminal> only when you want shell *semantics* that a
  highlighted code block can't express — an accent prompt caret and colored
  status output. Each line is classified by its leading token (see
  terminal-line.ts) and rendered by <TerminalLine>:

    ❯ / $ / #  prompt line — accent caret + the typed command
    ✓ / +      success / added   (green)
    ✗ / -      error / removed / stderr   (red)
    ⚠ / !      warning   (amber)
    (other)    muted output

  Usage:
    <Terminal title="~/app">
    ❯ pnpm build
    ✓ built in 1.24s
    </Terminal>

  Props:
    title   — label in the bar (a path or filename)
    prompt  — the prompt glyph to recognise/emphasise (default ❯; also $, #)
    reveal  — bind each line to a click, to step through the output
    cursor  — show a blinking cursor at the end of the last line
    fill    — grow to fill the slide (for the `full` layout)
-->
<template>
  <!-- Hidden source: we read its textContent, then render parsed lines. -->
  <div ref="src" style="display: none"><slot /></div>

  <div class="term" :class="{ 'term--fill': fill }">
    <div class="term__bar">
      <span v-if="title" class="term__title">{{ title }}</span>
    </div>
    <div class="term__body">
      <template v-for="(line, i) in lines" :key="i">
        <TerminalLine
          v-if="reveal"
          v-click
          :line="line"
          :cursor="cursor && i === lines.length - 1"
        />
        <TerminalLine
          v-else
          :line="line"
          :cursor="cursor && i === lines.length - 1"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TerminalLine from './TerminalLine.vue'
import { classifyLine, type TerminalLine as Line } from './terminal-line'

const props = withDefaults(
  defineProps<{
    title?: string
    prompt?: string
    reveal?: boolean
    cursor?: boolean
    fill?: boolean
  }>(),
  { prompt: '❯', reveal: false, cursor: false, fill: false },
)

const src = ref<HTMLElement>()
const lines = ref<Line[]>([])

onMounted(() => {
  const text = src.value?.textContent ?? ''
  lines.value = text
    .replace(/^\n+/, '')
    .replace(/\n+$/, '')
    .split('\n')
    .map((line) => classifyLine(line, props.prompt))
})
</script>

<style scoped>
.term {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.term--fill {
  height: 100%;
}

/* Same chrome as the auto-framed code blocks: the three traffic-light dots and
 * the bar background come from the shared tokens in base.css, painted from the
 * border-box left edge so they line up with the code-block chrome exactly. The
 * left padding clears the dots, so the title starts where the code title does. */
.term__bar {
  display: flex;
  align-items: center;
  height: var(--chrome-h);
  padding: 0 1.1rem 0 var(--chrome-title-x);
  background-color: var(--chrome-bar-bg);
  background-image: var(--chrome-dots);
  background-repeat: no-repeat;
  background-origin: border-box;
  border-bottom: 1px solid var(--border);
  flex: 0 0 auto;
}

.term__title {
  font-size: 0.8rem;
  color: var(--muted);
}

.term__body {
  padding: 1rem 1.25rem;
  font-size: var(--fs-code);
  line-height: 1.65;
  overflow: auto;
  flex: 1 1 auto;
  min-height: 0;
  white-space: pre-wrap;
}
</style>
