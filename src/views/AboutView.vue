<template>
  <div class="about">
    <h1>About</h1>
    <p>
      Welcome to the GitHub Contributions Tracker! This project aims to provide a simple and
      intuitive way to track your contributions on GitHub.
    </p>
    <p>
      With this tracker, you can easily monitor your daily, weekly, and monthly contributions,
      including the number of commits, pull requests, and issues you have made.
    </p>
    <p>
      Whether you are an open-source enthusiast, a developer looking to improve your GitHub profile,
      or simply curious about your GitHub activity, this tracker is here to help you stay informed
      and motivated.
    </p>
    <p>Start tracking your contributions today and see how your GitHub journey unfolds!</p>
    <br />
    <p>(Yes, this page was written by GitHub Copilot)</p>
    <Divider />
    <h1>Why</h1>
    <p>
      I thought it would be interesting and gave me an opportunity to practice backend functions and
      <strong>*gross*</strong> learn how to actually frontend code.
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
