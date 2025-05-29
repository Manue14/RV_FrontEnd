import { defineStore } from 'pinia'
import { auth, db } from '../firebase/config'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

async function isUserAllowed(email) {
  const docRef = doc(db, 'allowedUsers', email)
  const docSnap = await getDoc(docRef)
  return docSnap.exists()
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  actions: {
    async register(email, password) {
      this.loading = true
      this.error = null
      try {
        const allowed = await isUserAllowed(email)
        if (!allowed) {
          this.error = 'Este email no está autorizado para registrarse. Contacta con el administrador.'
          return
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (error) {
        let userMessage = 'Error al registrarse.'
        switch (error.code) {
          case 'auth/email-already-in-use':
            userMessage = 'Este email ya está registrado.';
            break;
          case 'auth/invalid-email':
            userMessage = 'El formato del email no es válido.';
            break;
          case 'auth/weak-password':
            userMessage = 'La contraseña es demasiado débil.';
            break;
          default:
            userMessage = error.message;
        }
        this.error = userMessage;
      } finally {
        this.loading = false
      }
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      console.log('Attempting login for:', email)
      try {
        console.log('Calling signInWithEmailAndPassword...')
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log('signInWithEmailAndPassword successful:', userCredential.user.email)

        const allowed = await isUserAllowed(userCredential.user.email)
        console.log('Firestore check result:', allowed)

        if (!allowed) {
          console.log('User not allowed, signing out.')
          await signOut(auth)
          this.user = null
          this.error = 'No tienes permiso para acceder. Contacta con el administrador.'
          throw new Error(this.error)
        }
        this.user = userCredential.user
        console.log('Login successful, user:', this.user.email)
      } catch (error) {
        console.error('Error during login:', error.message)
        let userMessage = 'Error al iniciar sesión.'
        switch (error.code) {
          case 'auth/user-not-found':
            userMessage = 'Usuario no encontrado.';
            break;
          case 'auth/wrong-password':
            userMessage = 'Contraseña incorrecta.';
            break;
          case 'auth/invalid-email':
            userMessage = 'El formato del email no es válido.';
            break;
          default:
            if (error.message === 'No tienes permiso para acceder. Contacta con el administrador.'){
               userMessage = error.message;
            } else {
               userMessage = error.message;
            }
        }
        this.error = userMessage;
      } finally {
        this.loading = false
        console.log('Login process finished.')
      }
    },

    async logout() {
      this.loading = true
      this.error = null
      try {
        await signOut(auth)
        this.user = null
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    async loginWithGoogle() {
      this.loading = true
      this.error = null
      try {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const allowed = await isUserAllowed(result.user.email)
        if (!allowed) {
          await signOut(auth)
          this.user = null
          this.error = 'No tienes permiso para acceder. Contacta con el administrador.'
          throw new Error(this.error)
        }
        this.user = result.user
      } catch (error) {
        let userMessage = 'Error al iniciar sesión con Google.'
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            userMessage = 'El popup de inicio de sesión fue cerrado.';
            break;
           case 'auth/account-exists-with-different-credential':
             userMessage = 'Ya existe una cuenta con este email. Inicia sesión con tu método original.';
             break;
          default:
            if (error.message === 'No tienes permiso para acceder. Contacta con el administrador.'){
               userMessage = error.message;
            } else {
               userMessage = error.message;
            }
        }
        this.error = userMessage;
      } finally {
        this.loading = false
      }
    },

    async loginWithGithub() {
      this.loading = true
      this.error = null
      console.log('Attempting GitHub login...')
      try {
        console.log('Calling signInWithPopup with GitHub provider...')
        const provider = new GithubAuthProvider()
        const result = await signInWithPopup(auth, provider)
        console.log('signInWithPopup successful for GitHub:', result.user.email)

        const allowed = await isUserAllowed(result.user.email)
        console.log('Firestore check result for GitHub:', allowed)

        if (!allowed) {
          console.log('GitHub user not allowed, signing out.')
          await signOut(auth)
          this.user = null
          this.error = 'No tienes permiso para acceder. Contacta con el administrador.'
          throw new Error(this.error)
        }
        this.user = result.user
        console.log('GitHub login successful, user:', this.user.email)
      } catch (error) {
        console.error('Error during GitHub login:', error)
        let userMessage = 'Error al iniciar sesión con GitHub.'
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            userMessage = 'El popup de inicio de sesión fue cerrado.';
            break;
          case 'auth/account-exists-with-different-credential':
            userMessage = 'Ya existe una cuenta con este email. Inicia sesión con tu método original.';
            break;
          default:
            if (error.message === 'No tienes permiso para acceder. Contacta con el administrador.'){
               userMessage = error.message;
            } else {
               userMessage = error.message;
            }
        }
        this.error = userMessage;
      } finally {
        this.loading = false
        console.log('GitHub login process finished.')
      }
    },

    init() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const allowed = await isUserAllowed(user.email)
          if (!allowed) {
            await signOut(auth)
            this.user = null
          } else {
            this.user = user
          }
        } else {
          this.user = null
        }
      })
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  }
}) 