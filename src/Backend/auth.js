// src/firebase/auth.js
import { auth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

// Registrar usuario
export const registrarUsuario = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Iniciar sesión
export const iniciarSesion = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Cerrar sesión
export const cerrarSesion = async () => {
  return await signOut(auth);
};
