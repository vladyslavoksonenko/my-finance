import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import messagePlugin from './utils/message.plugin'
// import 'materialize-css/dist/js/materialize.min'
// import 'materialize-css/dist/css/materialize.css'
// import 'materialize-css'
// import M from 'materialize-css'






createApp(App).use(router).use(messagePlugin).mount('#app')

