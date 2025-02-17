<template>
  <div class="card top-nav">
    <Menubar :model="items">
      <template #start>
        <RouterLink to="/">
          <i class="pi pi-github p-mr-2" style="font-size: 1.5rem" />
        </RouterLink>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <div class="card">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
            <a v-ripple :href="href" v-bind="props.action" @click="navigate">
              <span :class="item.icon" />
              <span>{{ item.label }}</span>
            </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
            <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
          </a>
        </div>
      </template>
      <template #end>
        <span>
          <router-link to="/faq" v-ripple>
            <i class="pi pi-question-circle p-mr-2" style="font-size: 1.5rem" />
          </router-link>
        </span>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: () => router.push({ name: 'about' }),
  },
  {
    label: 'Your GitHub Stats',
    icon: 'pi pi-user',
    command: () => router.push({ name: 'user' }),
  },
])
</script>

<style scoped>
.top-nav {
  position: fixed;
  top: 0.5%;
  left: 0.5%;
  right: 0.5%;
}
</style>
