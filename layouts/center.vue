<!-- center — a diagram or single figure that wants to be centered.
     Short title + the figure. STYLE_GUIDE §5. -->
<template>
  <div
    class="slidev-layout center"
    :style="{ '--prompt-glyph': promptGlyph($slidev.themeConfigs.glyph) }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { promptGlyph } from '../utils/glyph'
</script>
