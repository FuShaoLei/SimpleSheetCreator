<script setup>
import { ref, computed } from 'vue'
import { useSongStore } from '@/composables/useSongStore'

const emit = defineEmits(['close'])
const { song, importLyrics } = useSongStore()

const lyricsText = ref('')
const selectedSectionId = ref('')

const sectionOptions = computed(() => {
  return song.sections.map(s => ({
    id: s.id,
    label: s.labelIndex > 1 ? `${s.label} ${s.labelIndex}` : s.label,
  }))
})

function handleImport() {
  if (!lyricsText.value.trim() || !selectedSectionId.value) return
  importLyrics(lyricsText.value, Number(selectedSectionId.value))
  lyricsText.value = ''
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center" @click.self="emit('close')">
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-8 w-full max-w-lg shadow-2xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-label-caps text-label-caps text-on-surface text-lg">Import Lyrics</h2>
        <button @click="emit('close')" class="text-on-surface-variant hover:text-on-surface transition-colors">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <div class="mb-4">
        <label class="font-label-caps text-label-caps text-on-surface-variant mb-2 block">Paste Lyrics</label>
        <textarea
          v-model="lyricsText"
          class="w-full h-40 bg-surface-container border border-outline-variant rounded-lg p-3 font-editor-main text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary-fixed-dim resize-none"
          placeholder="Paste lyrics here, one line per row..."
        ></textarea>
      </div>
      <div class="mb-6">
        <label class="font-label-caps text-label-caps text-on-surface-variant mb-2 block">Target Section</label>
        <select
          v-model="selectedSectionId"
          class="w-full bg-surface-container border border-outline-variant rounded-lg p-3 font-label-caps text-on-surface-variant focus:outline-none focus:border-primary-fixed-dim appearance-none cursor-pointer"
        >
          <option value="" disabled>Select a section...</option>
          <option v-for="opt in sectionOptions" :key="opt.id" :value="opt.id">{{ opt.label }}</option>
        </select>
      </div>
      <div class="flex gap-3 justify-end">
        <button
          @click="emit('close')"
          class="px-6 py-2 bg-surface-variant text-on-surface-variant font-label-caps text-label-caps border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleImport"
          class="px-6 py-2 bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold rounded-lg hover:brightness-110 transition-all"
        >
          Import
        </button>
      </div>
    </div>
  </div>
</template>
