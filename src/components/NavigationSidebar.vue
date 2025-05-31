<template>
  <nav class="sidebar-nav">
    <!-- Botón de abrir menú lateral (icono grafica) -->
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('home-click')">
      <svg data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="color-fill">
        <title/>
        <path d="M46.34,20.52l-21-19a2,2,0,0,0-2.68,0l-21,19a2,2,0,1,0,2.68,3L24,5.7,43.66,23.48a2,2,0,0,0,2.68-3Z"/>
        <path d="M42,26a2,2,0,0,0-2,2V43H8V28a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V28A2,2,0,0,0,42,26Z"/>
      </svg>
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('tienda-click')"> <!--Botón de predicciones por tienda-->
     <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M898.64632 328.250685a53.515062 53.515062 0 0 0-53.515062-53.515062H721.91818c-10.33911-107.832849-101.132763-192.193992-211.684177-192.193992s-201.355771 84.361143-211.684178 192.193992H175.336748a53.515062 53.515062 0 0 0-53.515062 53.515062l-53.515061 581.098647a53.515062 53.515062 0 0 0 53.515061 53.515062l388.412317-5.89736 388.412317 5.89736a53.515062 53.515062 0 0 0 53.515061-53.515062l-53.515061-581.098647z m-388.412317-170.787968c68.991617 0 126.135 51.02126 136.099505 117.272906H374.123795c9.975207-66.262349 67.129293-117.272906 136.110208-117.272906z m0 724.583231l-364.683739 5.522754 49.533541-537.911993h630.278989l49.544244 537.911993-364.673035-5.522754z" class="color-fill" />
    </svg>
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('temporada-click')"> <!--Botón de predicciones por temporada-->
      <svg data-name="Layer 2" id="a866a81f-2948-4418-8bd5-1a5193c5f74e" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" class="color-fill">
        <path d="M29.545,34.75H5.455a5.211,5.211,0,0,1-5.2-5.2V8.56a5.21,5.21,0,0,1,5.205-5.2h24.09a5.21,5.21,0,0,1,5.2,5.205V29.545A5.211,5.211,0,0,1,29.545,34.75ZM5.455,5.855A2.708,2.708,0,0,0,2.75,8.56V29.545a2.709,2.709,0,0,0,2.705,2.7h24.09a2.708,2.708,0,0,0,2.7-2.7V8.56a2.707,2.707,0,0,0-2.7-2.7Z"/>
        <path d="M33.5,17.331H1.541a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z"/><path d="M9.459,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,9.459,9.155Z"/>
        <path d="M25.542,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,25.542,9.155Z"/>
      </svg>
    </button>
    <button class="sidebar-btn icon-btn top-btn" @click="$emit('top-click')">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M6.67 14H4C2.9 14 2 14.9 2 16V21C2 21.55 2.45 22 3 22H6.67C7.22 22 7.67 21.55 7.67 21V15C7.67 14.45 7.22 14 6.67 14Z" class="color-fill"></path>
          <path d="M13.3302 10H10.6602C9.56016 10 8.66016 10.9 8.66016 12V21C8.66016 21.55 9.11016 22 9.66016 22H14.3302C14.8802 22 15.3302 21.55 15.3302 21V12C15.3302 10.9 14.4402 10 13.3302 10Z" class="color-fill"></path>
          <path d="M20.0001 17H17.3301C16.7801 17 16.3301 17.45 16.3301 18V21C16.3301 21.55 16.7801 22 17.3301 22H21.0001C21.5501 22 22.0001 21.55 22.0001 21V19C22.0001 17.9 21.1001 17 20.0001 17Z" class="color-fill"></path>
          <path d="M15.0095 4.85047C15.3195 4.54047 15.4395 4.17047 15.3395 3.85047C15.2395 3.53047 14.9295 3.30047 14.4895 3.23047L13.5295 3.07047C13.4895 3.07047 13.3995 3.00047 13.3795 2.96047L12.8495 1.90047C12.4495 1.09047 11.5395 1.09047 11.1395 1.90047L10.6095 2.96047C10.5995 3.00047 10.5095 3.07047 10.4695 3.07047L9.50945 3.23047C9.06945 3.30047 8.76945 3.53047 8.65945 3.85047C8.55945 4.17047 8.67945 4.54047 8.98945 4.85047L9.72945 5.60047C9.76945 5.63047 9.79945 5.75047 9.78945 5.79047L9.57945 6.71047C9.41945 7.40047 9.67945 7.71047 9.84945 7.83047C10.0195 7.95047 10.3895 8.11047 10.9995 7.75047L11.8995 7.22047C11.9395 7.19047 12.0695 7.19047 12.1095 7.22047L12.9995 7.75047C13.2795 7.92047 13.5095 7.97047 13.6895 7.97047C13.8995 7.97047 14.0495 7.89047 14.1395 7.83047C14.3095 7.71047 14.5695 7.40047 14.4095 6.71047L14.1995 5.79047C14.1895 5.74047 14.2195 5.63047 14.2595 5.60047L15.0095 4.85047Z" class="color-fill"></path>
        </g>
      </svg>
    </button>
    <div class="spacer"></div>
    <button class="sidebar-btn icon-btn bottom-btn" @click="logout" title="Cerrar sesión">
      <svg width="32" height="32" viewBox="0 0 24 24" class="color-fill">
        <path d="M16 13v-2H7V8l-5 4 5 4v-3z"/>
        <path d="M20 3h-8c-1.1 0-2 .9-2 2v4h2V5h8v14h-8v-4h-2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
      </svg>
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-background-secondary);
  height: 99%;
  width: 120px;
  padding: 2rem 0 2rem 0;
}
.spacer {
  flex: 1 1 auto;
  width: 100%;
}
.icon-btn {
  background: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0.5rem 0;
}
.icon-btn:hover {
  background: var(--color-accent-grey);
}
.icon-img {
  width: 40px;
  height: 40px;
}
.top-btn {
  margin-top: 0.5rem;
}
.bottom-btn {
  margin-bottom: 0.5rem;
}
.sidebar-btn {
  margin-bottom: 3em;
}
</style> 