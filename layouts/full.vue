<!-- full — a single surface filling the screen (the "hero" mode). One
     terminal, code window or diagram, an optional title, no body. §5. -->
<template>
  <div
    class="slidev-layout full"
    :style="{ '--prompt-glyph': promptGlyph($slidev.themeConfigs.glyph) }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { promptGlyph } from '../utils/glyph'
</script>
