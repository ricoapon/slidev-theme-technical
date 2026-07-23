<!-- Default content slide — title + a short list, steps, or small structure.
     Padding & type scale come from the theme styles. -->
<template>
  <div
    class="slidev-layout default"
    :style="{ '--prompt-glyph': promptGlyph($slidev.themeConfigs.glyph) }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { promptGlyph } from '../utils/glyph'
</script>
