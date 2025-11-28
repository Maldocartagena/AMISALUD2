import React from "react";

export default function AppointmentCard({ appointment }) {
  return React.createElement(
    "div",
    { className: "p-4 bg-white shadow-md rounded-lg border" },

    // Título
    React.createElement(
      "h3",
      { className: "text-lg font-semibold" },
      appointment.title
    ),

    // Fecha
    React.createElement(
      "p",
      { className: "text-gray-600" },
      "Fecha: ",
      appointment.date
    ),

    // Descripción
    React.createElement(
      "p",
      { className: "text-gray-700 mt-2" },
      appointment.description
    )
  );
}
