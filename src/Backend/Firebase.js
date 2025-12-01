// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ Pega aquí tus credenciales copiadas desde Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDE1yf5NaZaJUWMqJXxgNVVwrYnPYzN6-0",
  authDomain: "ami-salud2.firebaseapp.com",
  projectId: "ami-salud2",
  storageBucket: "ami-salud2.firebasestorage.app",
  messagingSenderId: "599193005364",
  appId: "1:599193005364:web:bbc2dcbdef437391578961"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
