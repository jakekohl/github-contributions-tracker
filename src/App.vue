<script setup>
import '@/assets/main.css';
import TopNav from './components/TopNav.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <div>
    <TopNav />
    <RouterView />
  </div>
</template>

