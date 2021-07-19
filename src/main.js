import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import 'materialize-css/dist/js/materialize.min'

createApp(App).use(router).mount('#app')
