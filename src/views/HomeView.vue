<script setup>
const scope = import.meta.env.VITE_GH_SCOPES
const client_id = import.meta.env.VITE_GH_CLIENT_ID
const redirect_uri = import.meta.env.VITE_GH_REDIRECT_URI
</script>

<template>
  <h1>GitHub Contributions Tracker</h1>
  <p>Track your GitHub contributions and visualize your progress.</p>
  <br />
  <Button
    as="a"
    label="Get Started"
    icon="pi pi-github"
    :data-test="`get-started`"
    :href="`https://github.com/login/oauth/authorize?scope=${scope}&client_id=${client_id}&redirect_uri=${redirect_uri}`"
  />
</template>
