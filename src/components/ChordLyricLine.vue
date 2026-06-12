<script setup>
import { nextTick } from 'vue'
import { useSongStore } from '@/composables/useSongStore'

const props = defineProps({
  line: { type: Object, required: true },
  sectionId: { type: Number, required: true },
})

const { activeLineId, focusedInputElement, addLine, removeLine, song } = useSongStore()

function onFocusChords(e) {
  activeLineId.value = props.line.id
  focusedInputElement.value = e.target
}

function onFocusLyrics(e) {
  activeLineId.value = props.line.id
  focusedInputElement.value = e.target
}

function onLyricsKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const container = e.target.closest('.chord-lyric-line')
    if (container) {
      const chordInput = container.querySelector('.chord-input')
      if (chordInput) chordInput.focus()
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const newLine = addLine(props.sectionId, 'chord-lyric', props.line.id)
    if (newLine) {
      nextTick(() => {
        const el = document.querySelector(`[data-line-id="${newLine.id}"] .chord-input`)
        if (el) el.focus()
      })
    }
  } else if (e.key === 'Backspace' && props.line.lyrics === '' && props.line.chords === '') {
    e.preventDefault()
    removeLine(props.sectionId, props.line.id)
  }
}

function onChordsKeydown(e) {
  if (e.key === 'Tab') {
    e.preventDefault()
    const container = e.target.closest('.chord-lyric-line')
    if (container) {
      const lyricInput = container.querySelector('.lyric-input')
      if (lyricInput) lyricInput.focus()
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const newLine = addLine(props.sectionId, 'chord-lyric', props.line.id)
    if (newLine) {
      nextTick(() => {
        const el = document.querySelector(`[data-line-id="${newLine.id}"] .chord-input`)
        if (el) el.focus()
      })
    }
  }
}
</script>

<template>
  <div :class="['chord-lyric-line space-y-0 mb-1 pl-4 py-1', activeLineId === line.id ? 'editor-line-active' : '']" :data-line-id="line.id">
    <input
      v-model="line.chords"
      @focus="onFocusChords"
      @keydown="onChordsKeydown"
      class="chord-input w-full bg-transparent border-none focus:ring-0 p-0 font-editor-main text-primary-fixed-dim font-bold placeholder:text-on-surface-variant/20"
      placeholder="chords..."
      type="text"
    />
    <input
      v-model="line.lyrics"
      @focus="onFocusLyrics"
      @keydown="onLyricsKeydown"
      class="lyric-input w-full bg-transparent border-none focus:ring-0 p-0 font-editor-main text-on-surface placeholder:text-on-surface-variant/40"
      placeholder="lyrics..."
      type="text"
    />
  </div>
</template>
