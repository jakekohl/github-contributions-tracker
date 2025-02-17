<script>
const scope = 'repo:status,read:user,user:email'
const client_id = 'Ov23liTaeCMMntMoXZBp'
</script>

<template>
  <h1>GitHub Contributions Tracker</h1>
  <p>Track your GitHub contributions and visualize your progress.</p>
  <br />
  <Button
    as="a"
    label="Get Started"
    icon="pi pi-github"
    :href="`https://github.com/login/oauth/authorize?scope=${scope}&client_id=${client_id}`"
  />
</template>
