<!--
  TerminalLine — one classified line of <Terminal> output. Extracted so the
  line markup lives in ONE place: the parent otherwise had to repeat the whole
  caret/text/cursor template twice (once with `v-click`, once without) to make
  reveal optional. Now the parent toggles only the directive on this component.

  The leading token has already been classified by the parent (see Terminal.vue):
    is-prompt  accent caret + typed command
    is-success / is-error / is-warning  semantic-colored status
    is-output  muted output
-->
<template>
  <div class="term__line" :class="line.type">
    <span v-if="line.caret" class="term__caret">{{ line.caret }}</span
    ><span>{{ line.text }}</span
    ><Cursor v-if="cursor" />
  </div>
</template>

<script setup lang="ts">
import Cursor from './Cursor.vue'
import type { TerminalLine } from './terminal-line'

defineProps<{ line: TerminalLine; cursor?: boolean }>()
</script>

<style scoped>
.term__line {
  min-height: 1.65em;
}

.term__caret {
  color: var(--accent);
  font-weight: 700;
  margin-right: 0.6em;
}

.term__line.is-output {
  color: var(--muted);
}
.term__line.is-prompt {
  color: var(--text);
}
.term__line.is-success {
  color: var(--c-success);
}
.term__line.is-error {
  color: var(--c-error);
}
.term__line.is-warning {
  color: var(--c-warning);
}
</style>
