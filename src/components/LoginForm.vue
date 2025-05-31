<template>
  <div class="login-bg">
    <div class="login-card">
      <h2 class="login-title">Iniciar sesión</h2>
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="login-socials">
          <button type="button" class="login-social-btn google" @click="loginWithGoogle">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="login-social-icon" />
            Iniciar con Google
          </button>
          <div class="login-divider">
          <span>o</span>
        </div>
          <button type="button" class="login-social-btn github" @click="loginWithGithub">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" class="login-social-icon" />
            Iniciar con GitHub
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const loginWithGoogle = async () => {
  loading.value = true
  error.value = null
  try {
    await auth.loginWithGoogle()
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const loginWithGithub = async () => {
  loading.value = true
  error.value = null
  try {
    await auth.loginWithGithub()
    router.push('/')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: var(--color-panel);
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 18px;
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-title {
  color: var(--color-accent-dark-green);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
}
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0 0.5rem 0;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}
.login-divider::before, .login-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-accent-grey);
  margin: 0 0.5em;
}
.login-socials {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.login-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  background: white;
  color: var(--color-background-secondary);
  transition: 0.2s, color 0.2s;
}
.login-social-btn.google {
  border: 1.5px solid var(--color-accent-dark-green);
}
.login-social-btn.github {
  border: 1.5px solid var(--color-accent-grey);
  background: var(--color-background-secondary);
  color: white;
}
.login-social-icon {
  width: 22px;
  height: 22px;
}
</style> 