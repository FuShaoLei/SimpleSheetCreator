<script setup>
import { nextTick } from 'vue'
import { useSongStore } from '@/composables/useSongStore'

const props = defineProps({
  line: { type: Object, required: true },
  sectionId: { type: Number, required: true },
})

const { activeLineId, focusedInputElement, addLine, removeLine } = useSongStore()

function onFocus(e) {
  activeLineId.value = props.line.id
  focusedInputElement.value = e.target
}

function onKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    const newLine = addLine(props.sectionId, 'chord-lyric', props.line.id)
    if (newLine) {
      nextTick(() => {
        const el = document.querySelector(`[data-line-id="${newLine.id}"] .chord-input`)
        if (el) el.focus()
      })
    }
  } else if (e.key === 'Backspace' && props.line.content === '') {
    e.preventDefault()
    removeLine(props.sectionId, props.line.id)
  }
}
</script>

<template>
  <div :class="['mb-1 pl-4 py-1', activeLineId === line.id ? 'editor-line-active' : '']" :data-line-id="line.id">
    <input
      v-model="line.content"
      @focus="onFocus"
      @keydown="onKeydown"
      class="w-full bg-transparent border-none focus:ring-0 p-0 font-editor-main text-on-surface placeholder:text-on-surface-variant/40"
      placeholder="| G | G | Em | Em |"
      type="text"
    />
  </div>
</template>
