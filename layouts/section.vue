<!-- section — a "breath" divider between dense runs. A big number or label,
     then a 2–5 word title. -->
<template>
  <div class="slidev-layout section">
    <div v-if="no" class="section-no">{{ no }}</div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{ no?: string | number }>()
</script>
