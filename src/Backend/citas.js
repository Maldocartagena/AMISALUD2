// src/firebase/citas.js
import { db } from "./Firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

// Guardar una cita
export const crearCita = async (userId, data) => {
  return await addDoc(collection(db, "citas"), {
    userId: userId,
    ...data,
    estado: "pendiente",
    timestamp: Date.now()
  });
};

// Obtener todas las citas del usuario
export const obtenerCitasUsuario = async (userId) => {
  const ref = collection(db, "citas");

  const q = query(
    ref,
    where("userId", "==", userId),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);

  const citas = [];
  snapshot.forEach((doc) => {
    citas.push({ id: doc.id, ...doc.data() });
  });

  return citas;
};
