<script setup>
import { computed } from 'vue'
import { useSongStore } from '@/composables/useSongStore'

const { generateTxt } = useSongStore()

const previewText = computed(() => generateTxt())
</script>

<template>
  <div class="w-1/2 flex flex-col bg-surface-container-low">
    <div class="p-4 border-b border-outline-variant flex justify-between items-center">
      <h2 class="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">preview</span>
        TXT Preview
      </h2>
      <span class="text-[10px] font-label-caps text-outline">READ-ONLY</span>
    </div>
    <div class="flex-1 p-editor-padding overflow-y-auto font-editor-main text-sm text-outline opacity-80 select-none">
      <pre v-if="previewText" class="whitespace-pre-wrap">{{ previewText }}</pre>
      <div v-else class="text-on-surface-variant/30 text-center py-16">
        <p class="font-label-caps text-label-caps">Preview will appear here</p>
      </div>
    </div>
  </div>
</template>
