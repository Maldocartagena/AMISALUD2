import { auth, db } from "./Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// LOGIN
export async function loginUser(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (err) {
    throw new Error(err.message);
  }
}

// REGISTRO CON DATOS EXTRA
export async function registerUser(email, password, extraData = {}) {
  try {
    // 1. Crear usuario
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const user = result.user;

    // 2. Guardar datos adicionales en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      email,
      ...extraData,
      createdAt: new Date(),
      role: "paciente"
    });

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}
