import { LogOut } from "lucide-react";
import React from "react";

export default function Header({ showNav = false, onLogout }) {
  return React.createElement(
    "header",
    { className: "bg-white shadow-sm sticky top-0 z-50" },

    React.createElement(
      "div",
      {
        className:
          "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center",
      },

      // LOGO + NOMBRE
      React.createElement(
        "div",
        { className: "flex items-center gap-2" },

        React.createElement(
          "div",
          {
            className:
              "w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl",
          },
          "A"
        ),

        React.createElement(
          "span",
          {
            className:
              "text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent",
          },
          "AMI Salud"
        )
      ),

      // Botón Logout (solo si showNav = true)
      showNav
        ? React.createElement(
            "button",
            {
              onClick: onLogout,
              className:
                "flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl " +
                "shadow-sm border border-gray-200 text-gray-600 hover:text-red-600 " +
                "hover:border-red-300 transition-all duration-200",
            },
            React.createElement(LogOut, { size: 20 }),
            React.createElement(
              "span",
              { className: "hidden sm:inline font-medium" },
              "Cerrar Sesión"
            )
          )
        : null
    )
  );
}
