// src/agendamiento/pasos/Paso5Confirmacion.js
import React from "react";
import { crearCita } from "./../../Backend/citas";

function Paso5Confirmacion({
  selectedCesfam,
  selectedSpecialty,
  selectedDoctor,
  selectedDate,
  selectedTime,
  userId,
  onGoToDashboard
}) {
  const enviarRecordatorio = async (email, citaData) => {
    console.log("Se enviaría correo a", email, "con los datos de la cita:", citaData);
    // Aquí podrías integrar Firebase Functions o API de correo
  };

  const confirmarCita = async () => {
    if (!selectedTime || !userId) return;

    const citaData = {
      cesfam: {
        id: selectedCesfam.id,
        name: selectedCesfam.name,
        address: selectedCesfam.address
      },
      specialty: {
        id: selectedSpecialty.id,
        name: selectedSpecialty.name
      },
      doctor: {
        id: selectedDoctor.id,
        name: selectedDoctor.name
      },
      date: selectedDate,
      time: selectedTime,
      estado: "pendiente",
      userId: userId,
      timestamp: Date.now()
    };

    try {
      await crearCita(userId, citaData);
      await enviarRecordatorio("usuario@email.com", citaData);
      alert("¡Cita confirmada!");
      if (typeof onGoToDashboard === "function") onGoToDashboard();
    } catch (error) {
      console.error("Error al crear la cita:", error);
      alert("Ocurrió un error al guardar la cita. Intenta nuevamente.");
    }
  };

  return React.createElement(
    "div",
    { className: "max-w-md mx-auto space-y-4" },
    // Encabezado
    React.createElement(
      "div",
      { className: "text-center mb-6" },
      React.createElement(
        "div",
        { className: "w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-4" },
        "✅"
      ),
      React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "Confirma tu cita"),
      React.createElement("p", { className: "text-gray-600" }, "Revisa los detalles antes de confirmar")
    ),
    // Información de la cita
    React.createElement(
      "div",
      { className: "bg-white rounded-2xl p-6 shadow-lg space-y-4" },
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Centro de Salud"),
        React.createElement("p", { className: "font-bold" }, selectedCesfam?.name),
        React.createElement("p", { className: "text-sm text-gray-600" }, selectedCesfam?.address)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Especialidad"),
        React.createElement("p", { className: "font-bold" }, selectedSpecialty?.name)
      ),
      React.createElement(
        "div",
        null,
        React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Profesional"),
        React.createElement("p", { className: "font-bold" }, selectedDoctor?.name)
      ),
      React.createElement(
        "div",
        { className: "grid grid-cols-2 gap-4" },
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Fecha"),
          React.createElement("p", { className: "font-bold" }, selectedDate)
        ),
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "text-sm text-gray-600 mb-1" }, "Hora"),
          React.createElement("p", { className: "font-bold" }, selectedTime)
        )
      )
    ),
    // Recordatorio
    React.createElement(
      "div",
      { className: "bg-blue-50 rounded-2xl p-4" },
      React.createElement(
        "p",
        { className: "text-sm text-blue-900" },
        "💡 ",
        React.createElement("strong", null, "Recordatorio:"),
        " Te enviaremos una notificación 24 horas antes de tu cita."
      )
    ),
    // Botones
    React.createElement(
      "div",
      { className: "space-y-3" },
      React.createElement(
        "button",
        {
          onClick: confirmarCita,
          className: "w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
        },
        "Confirmar Cita"
      ),
      React.createElement(
        "button",
        {
          onClick: () => {
            if (typeof onGoToDashboard === "function") onGoToDashboard();
          },
          className: "w-full py-4 bg-gray-200 text-gray-800 rounded-xl font-semibold hover:bg-gray-300 transition"
        },
        "Volver al Dashboard"
      )
    )
  );
}

export default Paso5Confirmacion;
