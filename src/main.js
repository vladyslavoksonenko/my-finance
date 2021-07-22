import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from './utils/message.plugin'



createApp(App).use(router).use(messagePlugin).mount('#app')

