<script setup>
import EditorPanel from './EditorPanel.vue'
import PreviewPanel from './PreviewPanel.vue'
import FloatingToolbar from './FloatingToolbar.vue'
</script>

<template>
  <main class="ml-64 flex-1 flex flex-col relative bg-background overflow-hidden">
    <div class="flex-1 flex overflow-hidden">
      <EditorPanel />
      <PreviewPanel />
    </div>
    <FloatingToolbar />
  </main>
</template>
