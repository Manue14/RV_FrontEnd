import './assets/main.css'
import { createApp } from 'vue'
import App from './Test.vue'
import axiosInstance from './api/main'
import { apiServiceInit } from './api/service'

apiServiceInit(axiosInstance, "Test")
createApp(App).mount('#app')

