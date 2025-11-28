import React from "react";
import { Calendar, FileText, Clock } from "lucide-react";
import Header from "./Header";
import AppointmentCard from "./AppointmentCard";
import DocumentCard from "./DocumentCard";

export default function Dashboard({ onLogout }) {
  const appointments = [
    { id: 1, title: "Consulta General", date: "2025-11-20", description: "Revisión médica." },
    { id: 2, title: "Control Nutricional", date: "2025-11-25", description: "Seguimiento alimenticio." }
  ];

  const documents = [
    { id: 1, name: "Resultados de Exámenes", type: "PDF" },
    { id: 2, name: "Indicaciones Médicas", type: "DOCX" }
  ];

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-50" },

    // HEADER
    React.createElement(Header, { showNav: true, onLogout }),

    React.createElement(
      "main",
      { className: "max-w-7xl mx-auto px-4 py-8" },

      // Bloque Bienvenida
      React.createElement(
        "div",
        { className: "bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white mb-8" },
        React.createElement("h1", { className: "text-4xl font-bold mb-2" }, "¡Hola, Usuario! 👋"),
        React.createElement("p", { className: "text-emerald-50 text-lg" }, "Bienvenido a tu centro de salud digital")
      ),

      // Estadísticas
      React.createElement(
        "div",
        { className: "grid md:grid-cols-3 gap-6 mb-8" },

        // Tarjeta 1
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-6 shadow-lg text-center" },
          React.createElement(Calendar, { className: "mx-auto mb-3", size: 32 }),
          React.createElement("h3", { className: "font-bold text-xl" }, "Citas Agendadas"),
          React.createElement("p", { className: "text-gray-600 text-lg" }, appointments.length)
        ),

        // Tarjeta 2
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-6 shadow-lg text-center" },
          React.createElement(FileText, { className: "mx-auto mb-3", size: 32 }),
          React.createElement("h3", { className: "font-bold text-xl" }, "Documentos"),
          React.createElement("p", { className: "text-gray-600 text-lg" }, documents.length)
        ),

        // Tarjeta 3
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-6 shadow-lg text-center" },
          React.createElement(Clock, { className: "mx-auto mb-3", size: 32 }),
          React.createElement("h3", { className: "font-bold text-xl" }, "Próxima Cita"),
          React.createElement("p", { className: "text-gray-600 text-lg" }, "1")
        )
      ),

      // Lista de Citas
      React.createElement("h2", { className: "text-2xl font-bold mt-4" }, "Próximas Citas"),
      React.createElement(
        "div",
        { className: "grid gap-4 md:grid-cols-2 mt-4" },
        appointments.map((a) =>
          React.createElement(AppointmentCard, { key: a.id, appointment: a })
        )
      ),

      // Lista de Documentos
      React.createElement("h2", { className: "text-2xl font-bold mt-8" }, "Documentos Disponibles"),
      React.createElement(
        "div",
        { className: "grid gap-4 md:grid-cols-2 mt-4" },
        documents.map((d) =>
          React.createElement(DocumentCard, { key: d.id, document: d })
        )
      )
    )
  );
}
