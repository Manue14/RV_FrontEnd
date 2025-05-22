import './assets/main.css'
import { createApp } from 'vue'
import App from './Test.vue'
import axiosInstance from './api/main'
import { apiServiceInit } from './api/service'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
apiServiceInit(axiosInstance, "Test")
app.use(pinia)
app.mount('#app')

