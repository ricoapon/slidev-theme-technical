<!-- two-cols — text beside a surface (terminal / code window / diagram).
     Slots:
       (default slot) → an optional title/header spanning both columns
       ::left::        → left column
       ::right::       → right column
     STYLE_GUIDE §5. Alternate which side the surface sits on across a run. -->
<template>
  <div
    class="slidev-layout two-cols"
    :style="{ '--prompt-glyph': promptGlyph($slidev.themeConfigs.glyph) }"
  >
    <div v-if="$slots.default" class="tc-header">
      <slot />
    </div>
    <div class="tc-cols">
      <div class="col-left">
        <slot name="left" />
      </div>
      <div class="col-right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { promptGlyph } from '../utils/glyph'
</script>
