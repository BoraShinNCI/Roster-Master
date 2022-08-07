import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import router from './router.js'



let app = createApp(App)

import store from './store.js'

app.use(store)
.use(router).mount('#app')
