import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCFKROGzwXgHfyEvH0osbLE4WhwN-HHNmU",
    authDomain: "rv-login-e22cb.firebaseapp.com",
    projectId: "rv-login-e22cb",
    storageBucket: "rv-login-e22cb.firebasestorage.app",
    messagingSenderId: "201612022676",
    appId: "1:201612022676:web:67f414e341e54e75b2b581",
    measurementId: "G-981XKXKT05"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db } 