<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const op = ref()

const toggle = (event) => {
  op.value.toggle(event)
}

const linkMenu = [
  {
    label: 'Code',
    ariaLabel: 'GitHub',
    icon: 'pi pi-github',
    href: 'https://github.com/jakekohl/github-contributions-tracker',
  },
  {
    label: 'Discord',
    ariaLabel: 'Discord',
    icon: 'pi pi-discord',
    href: '',
  },
  {
    label: 'Twitter',
    ariaLabel: 'Twitter',
    icon: 'pi pi-twitter',
    href: 'https://x.com/jacobofwonder',
  },
]
</script>

<template>
  <Toolbar class="bottom-info fixed-bottom">
    <template #start>
      <RouterLink to="/faq">
        <Button icon="pi pi-question" raised rounded variant="text" />
      </RouterLink>
    </template>
    <template #end>
      <div>Personal project by <a href="https://github.com/jakekohl">Jacob Kohl</a></div>
      <Divider layout="vertical" />
      <Button
        icon="pi pi-link"
        class="mr-2 py-2"
        aria-label="Learn More"
        rounded
        size="small"
        @click="toggle"
      />
      <Popover ref="op">
        <div class="flex flex-col gap-4 w-[25rem]">
          <h4 class="text-center">Learn More:</h4>
          <Divider />
          <div v-for="link in linkMenu">
            <Button
              as="a"
              :icon="link.icon"
              :label="link.label"
              :aria-label="link.ariaLabel"
              :href="link.href"
              target="_blank"
              raised
              variant="text"
              rel="noopener noreferrer"
              class="learn-more-button"
            />
          </div>
        </div>
      </Popover>
    </template>
  </Toolbar>
</template>

<style>
.bottom-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  bottom: auto;
  margin-bottom: 0px;
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000; /* Adjust as needed to ensure it appears above other content */
}
.learn-more-button {
  margin: 0.5rem;
  padding: 0.5rem;
  margin-right: 1px;
}
</style>
