<script setup>
const questions = [
  {
    question: 'What is GitHub Contributions Tracker?',
    answer:
      'GitHub Contributions Tracker is a tool that allows you to track your GitHub contributions and visualize your progress.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Click the "Get Started" button below to authenticate with GitHub and start tracking your contributions.',
  },
  {
    question: 'How do I view my GitHub stats?',
    answer:
      'Click the "Your GitHub Stats" button in the top navigation bar to view your GitHub stats.',
  },
  {
    question: 'How do I contribute to this project?',
    answer: 'You can contribute to this project by submitting a pull request on GitHub.',
  },
]
</script>

<template>
  <Card>
    <h2>Frequently Asked Questions</h2>
    <p>Because why would you even ask?</p>
    <Divider />
    <Accordion>
      <template #header>
        <div class="flex justify-between">
          <h3>{{ question.question }}</h3>
          <i class="pi pi-chevron-down" />
        </div>
      </template>
      <template #content>
        <p>{{ question.answer }}</p>
      </template>
    </Accordion>
  </Card>
</template>
