<!-- cover — title slide / deck identity. A solid near-black surface, a big
     title with the accent prompt glyph, and one supporting line. §5. -->
<template>
  <div
    class="slidev-layout cover"
    :style="{ '--prompt-glyph': promptGlyph($slidev.themeConfigs.glyph) }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { promptGlyph } from '../utils/glyph'
</script>
