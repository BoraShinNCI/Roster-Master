import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router.js'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'


let app = createApp(App)

import store from './store.js'

app.use(store).use(BootstrapVue).use(BootstrapVueIcons)
.use(router).mount('#app')
