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
  background: #23243a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: #2a2c3b;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  width: 100%;
  max-width: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-title {
  color: #34A4EE;
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
.login-input-group {
  width: 100%;
}
.login-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #35365a;
  background: #23243a;
  color: #fff;
  font-size: 1rem;
  outline: none;
  margin-bottom: 0.2rem;
  transition: border 0.2s;
}
.login-input:focus {
  border: 1.5px solid #34A4EE;
}
.login-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #34A4EE;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:disabled {
  background: #6bbcf7;
  cursor: not-allowed;
}
.login-btn:hover:not(:disabled) {
  background: #2386c8;
}
.login-error {
  color: #ff6b6b;
  text-align: center;
  font-size: 0.95rem;
  margin-top: -0.5rem;
}
.login-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.5rem 0 0.5rem 0;
  color: #aaa;
  font-size: 0.95rem;
}
.login-divider::before, .login-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #35365a;
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
  background: #fff;
  color: #23243a;
  transition: background 0.2s, color 0.2s;
}
.login-social-btn.google {
  border: 1.5px solid #34A4EE;
}
.login-social-btn.github {
  border: 1.5px solid #35365a;
  background: #23243a;
  color: #fff;
}
.login-social-icon {
  width: 22px;
  height: 22px;
}
.login-register {
  text-align: center;
  margin-top: 0.5rem;
  font-size: 0.97rem;
  color: #aaa;
}
.login-register span {
  color: #34A4EE;
  font-weight: 600;
}
.login-error-access {
  background: #2a2c3b;
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
}
</style> 