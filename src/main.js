import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import { useAuthStore } from './stores/auth'
import axiosInstance from './api/main'
import { apiServiceInit } from './api/service'

// Crear la aplicación
const app = createApp(App)
const pinia = createPinia()

// Usar los plugins
app.use(pinia)
app.use(router)

// Inicializar el servicio API
apiServiceInit(axiosInstance, "Frontend")

// Inicializar el estado de autenticación
const authStore = useAuthStore()
authStore.init()

// Montar la aplicación
app.mount('#app')

