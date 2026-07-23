<!--
  Cursor — a CSS-only blinking block cursor in the accent color. Always a
  block, always blinking (that is the whole point of the component). §6.4.

  It is a styled box, not a glyph, so it is always a single clean rectangle
  regardless of the font, with a neon glow (a colored box-shadow bloom).

  Prop:  color — 'accent' (default) | 'text' | a raw hex (discouraged).
-->
<template>
  <!-- `color` drives the fill and the glow via currentColor, so the neon bloom
       is expressed once in CSS rather than rebuilt as a string in JS. -->
  <span class="cursor" :style="{ color: resolved }" aria-hidden="true"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ color?: string }>(), {
  color: 'accent',
})

const resolved = computed(() => {
  if (props.color === 'accent') return 'var(--accent)'
  if (props.color === 'text') return 'var(--text)'
  return props.color
})
</script>

<style scoped>
.cursor {
  display: inline-block;
  width: 0.35em;
  height: 1.05em;
  margin-left: 0.12em;
  vertical-align: text-bottom;
  background: currentColor;
  box-shadow:
    0 0 6px currentColor,
    0 0 16px currentColor;
  animation: cursor-blink 2s steps(1) infinite;
}

@keyframes cursor-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}
</style>
