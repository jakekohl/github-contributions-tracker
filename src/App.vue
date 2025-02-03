<script setup>
import '@/assets/main.css'
import TopNav from '@/components/TopNav.vue'
import BottomInfo from '@/components/BottomInfo.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <TopNav />
    <RouterView />
    <BottomInfo />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
