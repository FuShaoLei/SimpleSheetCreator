<script setup>
import { useSongStore } from '@/composables/useSongStore'
import SectionBlock from './SectionBlock.vue'

const { song } = useSongStore()
</script>

<template>
  <div class="w-1/2 flex flex-col border-r border-outline-variant bg-surface-container-lowest">
    <div class="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
      <h2 class="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">edit_note</span>
        Interactive Editor
      </h2>
      <span class="text-[10px] font-label-caps text-outline">UTF-8 CHARS ONLY</span>
    </div>
    <div class="flex-1 p-editor-padding overflow-y-auto font-editor-main text-editor-main leading-relaxed">
      <SectionBlock
        v-for="(section, idx) in song.sections"
        :key="section.id"
        :section="section"
        :section-index="idx"
        :total-sections="song.sections.length"
      />
      <div v-if="song.sections.length === 0" class="text-on-surface-variant/40 text-center py-16">
        <span class="material-symbols-outlined text-4xl mb-4 block">queue_music</span>
        <p class="font-label-caps text-label-caps">No sections yet</p>
        <p class="font-body-sm text-body-sm mt-1">Use the sidebar to add sections</p>
      </div>
    </div>
  </div>
</template>
