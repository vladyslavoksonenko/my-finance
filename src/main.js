import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
// import messagePlugin from './utils/message.plugin'


//.use(messagePlugin)

createApp(App).use(router).mount('#app')

