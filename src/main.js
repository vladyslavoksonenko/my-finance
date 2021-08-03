import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import M from 'materialize-css/dist/js/materialize.min'
import messagePlugin from './utils/message.plugin'



createApp(App).use(router).use(messagePlugin).use(M).mount('#app')

