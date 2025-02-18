import './assets/main.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import ToastService from 'primevue/toastservice'
import primevue from '@/util/primevue.js'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
    options: 'p',
    darkModeSelector: 'system',
    cssLayer: false,
    ripple: true,
  })
  .use(ToastService)
  .directive('ripple', Ripple)
// loads all primevue components defined in @src/util/primevue.js
for (const component in primevue) {
  app.component(component, primevue[component])
}

app.mount('#app')
