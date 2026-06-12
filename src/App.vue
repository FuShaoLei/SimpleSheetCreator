<script setup>
import TopAppBar from './components/TopAppBar.vue'
import SideNavBar from './components/SideNavBar.vue'
import MainContent from './components/MainContent.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopAppBar />
    <div class="flex h-[calc(100vh-81px)]">
      <SideNavBar />
      <MainContent />
    </div>
  </div>
</template>
