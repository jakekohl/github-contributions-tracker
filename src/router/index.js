import { createRouter, createWebHistory } from 'vue-router'

// Import views
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import UserView from '@/views/UserView.vue'
import FAQView from '@/views/FAQView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
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
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
  ],
})

export default router
