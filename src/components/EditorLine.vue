<script setup>
import GridLine from './GridLine.vue'
import ChordLyricLine from './ChordLyricLine.vue'
import LyricLine from './LyricLine.vue'

defineProps({
  line: { type: Object, required: true },
  sectionId: { type: Number, required: true },
})
</script>

<template>
  <GridLine v-if="line.type === 'grid'" :line="line" :section-id="sectionId" />
  <ChordLyricLine v-else-if="line.type === 'chord-lyric'" :line="line" :section-id="sectionId" />
  <LyricLine v-else-if="line.type === 'lyric'" :line="line" :section-id="sectionId" />
</template>
