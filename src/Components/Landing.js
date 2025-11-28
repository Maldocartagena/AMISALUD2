import React from "react";
import Header from "./Header";
import { Calendar, Clock } from "lucide-react";

const Landing = ({ goToLogin }) => {
  return React.createElement(
    "div",
    { className: "min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50" },

    // Header
    React.createElement(Header, null),

    // Primera sección
    React.createElement(
      "section",
      { className: "max-w-7xl mx-auto px-4 py-16" },
      React.createElement(
        "div",
        { className: "grid md:grid-cols-2 gap-12 items-center" },

        // Lado izquierdo
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            { className: "text-5xl font-bold text-gray-900 mb-6 leading-tight" },
            "Tu salud, ",
            React.createElement(
              "span",
              { className: "bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent" },
              "más cerca"
            ),
            " que nunca"
          ),
          React.createElement(
            "p",
            { className: "text-xl text-gray-600 mb-8" },
            "Agenda tus horas médicas y accede a todos tus documentos clínicos desde cualquier lugar."
          ),
          React.createElement(
            "button",
            {
              onClick: goToLogin,
              className:
                "px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition text-lg",
            },
            "Ingresar al Sistema"
          )
        ),

        // Lado derecho (tarjeta de próxima cita)
        React.createElement(
          "div",
          { className: "bg-white rounded-3xl shadow-2xl p-8" },

          React.createElement(
            "div",
            { className: "flex items-center gap-4 mb-6" },
            React.createElement(
              "div",
              {
                className:
                  "w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-3xl",
              },
              "📅"
            ),
            React.createElement(
              "div",
              null,
              React.createElement("h3", { className: "font-bold text-lg" }, "Próxima cita"),
              React.createElement("p", { className: "text-gray-600" }, "Dra. María González")
            )
          ),

          React.createElement(
            "div",
            { className: "bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6" },

            React.createElement(
              "div",
              { className: "flex justify-between items-center mb-4" },
              React.createElement("span", { className: "text-gray-600" }, "Medicina General"),
              React.createElement(
                "span",
                { className: "bg-emerald-500 text-white px-3 py-1 rounded-full text-sm" },
                "Confirmada"
              )
            ),

            React.createElement(
              "div",
              { className: "flex gap-6 text-gray-700" },

              React.createElement(
                "div",
                { className: "flex items-center gap-2" },
                React.createElement(Calendar, { size: 18 }),
                React.createElement("span", null, "15 Nov 2025")
              ),

              React.createElement(
                "div",
                { className: "flex items-center gap-2" },
                React.createElement(Clock, { size: 18 }),
                React.createElement("span", null, "10:30 hrs")
              )
            )
          )
        )
      )
    ),

    // Segunda sección (características)
    React.createElement(
      "section",
      { className: "max-w-7xl mx-auto px-4 py-16" },

      React.createElement(
        "h2",
        { className: "text-3xl font-bold text-center mb-12" },
        "Características principales"
      ),

      React.createElement(
        "div",
        { className: "grid md:grid-cols-3 gap-8" },

        // Tarjeta 1
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-8 shadow-lg" },
          React.createElement(
            "div",
            {
              className:
                "w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl mb-4",
            },
            "⚡"
          ),
          React.createElement("h3", { className: "text-xl font-bold mb-3" }, "Rápido y Simple"),
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "Agenda tu hora médica sin filas ni complicaciones."
          )
        ),

        // Tarjeta 2
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-8 shadow-lg" },
          React.createElement(
            "div",
            {
              className:
                "w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-3xl mb-4",
            },
            "📱"
          ),
          React.createElement("h3", { className: "text-xl font-bold mb-3" }, "Disponible 24/7"),
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "Accede cuando lo necesites desde cualquier dispositivo."
          )
        ),

        // Tarjeta 3
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-8 shadow-lg" },
          React.createElement(
            "div",
            {
              className:
                "w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-3xl mb-4",
            },
            "🔒"
          ),
          React.createElement("h3", { className: "text-xl font-bold mb-3" }, "Seguro"),
          React.createElement(
            "p",
            { className: "text-gray-600" },
            "Tus datos protegidos con los más altos estándares."
          )
        )
      )
    )
  );
};

export default Landing;
