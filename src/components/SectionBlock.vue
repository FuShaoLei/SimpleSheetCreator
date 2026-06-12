<script setup>
import { computed } from 'vue'
import { useSongStore } from '@/composables/useSongStore'
import EditorLine from './EditorLine.vue'

const props = defineProps({
  section: { type: Object, required: true },
  sectionIndex: { type: Number, required: true },
  totalSections: { type: Number, required: true },
})

const { activeSectionId, removeSection, moveSectionUp, moveSectionDown, addLine } = useSongStore()

const sectionLabel = computed(() => {
  const s = props.section
  // Show index if there are multiple of same label OR index > 1
  return s.labelIndex > 1 ? `${s.label} ${s.labelIndex}` : s.label
})

function onAddGridLine() {
  addLine(props.section.id, 'grid')
}

function onAddChordLyricLine() {
  addLine(props.section.id, 'chord-lyric')
}

function onAddLyricLine() {
  addLine(props.section.id, 'lyric')
}
</script>

<template>
  <div class="mb-6">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="opacity-60 font-bold text-secondary font-label-caps text-label-caps">
          [{{ sectionLabel }}]
        </span>
      </div>
      <div class="flex items-center gap-1">
        <!-- Add line buttons -->
        <button
          @click="onAddGridLine"
          class="p-1 text-on-surface-variant hover:text-primary-fixed-dim transition-colors"
          title="Add bar line"
        >
          <span class="material-symbols-outlined text-sm">straighten</span>
        </button>
        <button
          @click="onAddChordLyricLine"
          class="p-1 text-on-surface-variant hover:text-primary-fixed-dim transition-colors"
          title="Add chord+lyric line"
        >
          <span class="material-symbols-outlined text-sm">music_note</span>
        </button>
        <button
          @click="onAddLyricLine"
          class="p-1 text-on-surface-variant hover:text-primary-fixed-dim transition-colors"
          title="Add lyric line"
        >
          <span class="material-symbols-outlined text-sm">short_text</span>
        </button>
        <div class="w-px h-4 bg-outline-variant mx-1"></div>
        <!-- Reorder buttons -->
        <button
          @click="moveSectionUp(section.id)"
          :disabled="sectionIndex === 0"
          class="p-1 text-on-surface-variant hover:text-primary-fixed-dim transition-colors disabled:opacity-30"
          title="Move up"
        >
          <span class="material-symbols-outlined text-sm">arrow_upward</span>
        </button>
        <button
          @click="moveSectionDown(section.id)"
          :disabled="sectionIndex === totalSections - 1"
          class="p-1 text-on-surface-variant hover:text-primary-fixed-dim transition-colors disabled:opacity-30"
          title="Move down"
        >
          <span class="material-symbols-outlined text-sm">arrow_downward</span>
        </button>
        <button
          @click="removeSection(section.id)"
          class="p-1 text-on-surface-variant hover:text-error transition-colors"
          title="Delete section"
        >
          <span class="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>
    <!-- Lines -->
    <EditorLine
      v-for="line in section.lines"
      :key="line.id"
      :line="line"
      :section-id="section.id"
    />
    <!-- Empty state -->
    <div v-if="section.lines.length === 0" class="mt-2 border-t border-dashed border-outline-variant pt-4 pl-4">
      <span class="inline-block w-2 h-5 bg-primary-container animate-pulse align-middle"></span>
    </div>
  </div>
</template>
