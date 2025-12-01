// src/agendamiento/bookingController.js
import { crearCita, obtenerCitasUsuario } from "../Backend/citas";

// Guardar cita
export const guardarCita = async (userId, citaData) => {
  try {
    const docRef = await crearCita(userId, citaData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error guardando cita:", error);
    return { success: false, error };
  }
};

// Obtener citas de usuario
export const getCitasUsuario = async (userId) => {
  try {
    const citas = await obtenerCitasUsuario(userId);
    return { success: true, citas };
  } catch (error) {
    console.error("Error obteniendo citas:", error);
    return { success: false, error };
  }
};
