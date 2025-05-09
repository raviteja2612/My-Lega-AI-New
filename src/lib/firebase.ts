import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT4h6ZH57lU_bUGV0VHH9vo2_Oe5a6750",
  authDomain: "my-legal-ai.firebaseapp.com",
  projectId: "my-legal-ai",
  storageBucket: "my-legal-ai.firebasestorage.app",
  messagingSenderId: "308164699900",
  appId: "1:308164699900:web:24d750e3a5d3c365e9d979",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
