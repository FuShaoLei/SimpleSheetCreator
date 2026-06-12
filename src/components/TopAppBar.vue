<script setup>
import { useSongStore } from '@/composables/useSongStore'

const { song, copyToClipboard, exportTxt } = useSongStore()

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

function onMouseMove(e) {
  const btn = e.currentTarget
  btn.style.boxShadow = '0 0 25px rgba(250, 204, 21, 0.5)'
}
function onMouseLeave(e) {
  e.currentTarget.style.boxShadow = ''
}
</script>

<template>
  <header class="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center w-full px-margin-desktop py-4 z-50 sticky top-0">
    <div class="flex items-center gap-8">
      <h1 class="font-display-lg text-display-lg font-extrabold text-primary-fixed-dim tracking-tighter">Voltage & Ink</h1>
      <div class="flex items-center gap-4 bg-surface-container px-4 py-1.5 rounded border border-outline-variant">
        <input
          v-model="song.title"
          class="bg-transparent border-none focus:ring-0 font-editor-main text-primary-fixed-dim placeholder:text-on-surface-variant w-48"
          placeholder="Song Title"
          type="text"
        />
        <div class="h-6 w-px bg-outline-variant"></div>
        <select
          v-model="song.key"
          class="bg-transparent border-none focus:ring-0 font-label-caps text-on-surface-variant appearance-none cursor-pointer"
        >
          <option v-for="k in keys" :key="k" :value="k">KEY: {{ k }}</option>
        </select>
        <div class="h-6 w-px bg-outline-variant"></div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-on-surface-variant text-sm">speed</span>
          <input
            v-model.number="song.bpm"
            class="bg-transparent border-none focus:ring-0 font-label-caps text-on-surface-variant w-12 text-center"
            type="number"
          />
        </div>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <button
        @click="copyToClipboard"
        class="px-6 py-2 bg-surface-variant text-on-surface-variant font-label-caps text-label-caps border border-outline-variant hover:bg-surface-container-high transition-colors active:scale-95 duration-100"
      >
        Copy
      </button>
      <button
        @click="exportTxt"
        @mousemove="onMouseMove"
        @mouseleave="onMouseLeave"
        class="px-6 py-2 bg-primary-container text-on-primary-container font-label-caps text-label-caps font-bold hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all active:scale-95 duration-100"
      >
        Export .txt
      </button>
    </div>
  </header>
</template>
