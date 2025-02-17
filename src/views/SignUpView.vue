<script setup>
import { ref } from 'vue'

const isProvisioning = ref(false)
</script>

<template>
  <h1>Sign Up</h1>
  <p>Sign up to track your GitHub contributions and visualize your progress.</p>
  <br />
  <Button as="a" label="Sign Up with GitHub" icon="pi pi-github" :disabled="isProvisioning" />
</template>
