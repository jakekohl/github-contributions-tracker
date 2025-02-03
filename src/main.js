import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    },
    options: 'p',
    darkModeSelector: 'system',
    cssLayer: false,
    ripple: true,
  });

app.mount('#app')
