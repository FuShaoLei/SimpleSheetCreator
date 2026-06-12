<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/composables/useSongStore'
import ImportLyricsModal from './ImportLyricsModal.vue'

const { addSection, insertChordAtCursor, song } = useSongStore()

const showImportModal = ref(false)

const sections = ['Intro', 'Verse', 'Chorus', 'Solo', 'Bridge', 'Ending']
const chords = ['G', 'C', 'D', 'Em', 'Am', 'F', 'Bm', 'G7']

function onChordClick(chord) {
  insertChordAtCursor(chord)
}
</script>

<template>
  <aside class="fixed left-0 w-64 h-full bg-surface-container-low border-r border-outline-variant flex flex-col pt-8 pb-8 px-4 z-40">
    <div class="mb-8">
      <p class="font-label-caps text-label-caps text-primary-fixed-dim mb-2 uppercase tracking-widest">Editor Tools</p>
      <p class="font-body-sm text-body-sm text-on-surface-variant">V1.0.4-STABLE</p>
    </div>
    <div class="space-y-8 overflow-y-auto pr-2">
      <!-- Sections -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="material-symbols-outlined text-primary-fixed-dim">segment</span>
          <h3 class="font-label-caps text-label-caps text-on-surface">Sections</h3>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="s in sections"
            :key="s"
            @click="addSection(s)"
            class="p-2 text-xs font-label-caps bg-surface-container-highest border border-outline-variant text-on-surface hover:text-primary-fixed-dim hover:bg-surface-variant transition-all rounded-lg active:translate-x-1 duration-200"
          >
            [{{ s }}]
          </button>
        </div>
      </div>
      <!-- Chord Pick -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <span class="material-symbols-outlined text-primary-fixed-dim">music_note</span>
          <h3 class="font-label-caps text-label-caps text-on-surface">Chord Pick</h3>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="chord in chords"
            :key="chord"
            @click="onChordClick(chord)"
            class="aspect-square flex items-center justify-center font-editor-chord bg-surface-container-highest border border-outline-variant text-on-surface-variant hover:text-primary-fixed-dim hover:bg-surface-variant transition-all rounded active:scale-90"
          >
            {{ chord }}
          </button>
        </div>
      </div>
      <!-- Add Section Button -->
      <button
        @click="addSection('Verse')"
        class="w-full mt-4 py-3 bg-secondary-container text-on-secondary-container font-label-caps text-label-caps font-bold rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all"
      >
        <span class="material-symbols-outlined">add</span>
        Add Section
      </button>
      <!-- Import Lyrics Button -->
      <button
        @click="showImportModal = true"
        class="w-full py-3 bg-surface-variant text-on-surface-variant font-label-caps text-label-caps border border-outline-variant rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all"
      >
        <span class="material-symbols-outlined">lyrics</span>
        Import Lyrics
      </button>
    </div>
    <ImportLyricsModal v-if="showImportModal" @close="showImportModal = false" />
  </aside>
</template>
