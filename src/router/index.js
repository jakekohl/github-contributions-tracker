import { createRouter, createWebHistory } from 'vue-router'

// Import views
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import FAQView from '@/views/FAQView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQView,
    },
  ],
})

export default router
