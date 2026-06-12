<script setup>
import { ref } from 'vue'
import { useSongStore } from '@/composables/useSongStore'

const { insertBarLine, activeSectionId, findSection } = useSongStore()

const barInput = ref('')
const feedback = ref(false)

function handleGenerate() {
  const val = barInput.value.trim()
  if (!val) return
  const result = insertBarLine(val)
  if (result) {
    barInput.value = ''
    feedback.value = true
    setTimeout(() => { feedback.value = false }, 1500)
  }
}
</script>

<template>
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-50">
    <div class="glass-panel rounded-full p-2 flex items-center gap-2 shadow-2xl border-primary-fixed-dim/20">
      <div class="bg-primary-container/10 p-2 rounded-full ml-2">
        <span class="material-symbols-outlined text-primary-fixed-dim">straighten</span>
      </div>
      <div class="flex-1 px-4">
        <p class="text-[10px] font-label-caps text-outline mb-1">BAR LINE GENERATOR</p>
        <input
          v-model="barInput"
          @keypress.enter="handleGenerate"
          class="w-full bg-transparent border-none focus:ring-0 p-0 font-editor-main text-on-surface placeholder:text-on-surface-variant/40"
          :placeholder="feedback ? 'Bar Added!' : 'Type chords (e.g., G G Em)'"
          type="text"
        />
      </div>
      <button
        @click="handleGenerate"
        class="bg-primary-container text-on-primary-container h-10 px-6 rounded-full font-label-caps text-xs font-bold hover:brightness-110 active:scale-95 transition-all"
      >
        GENERATE
      </button>
    </div>
  </div>
</template>
