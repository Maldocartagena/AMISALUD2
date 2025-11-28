import React from "react";

export default function DocumentCard({ document }) {
  return React.createElement(
    "div",
    { className: "p-4 bg-white shadow-md rounded-lg border" },

    // Título
    React.createElement(
      "h3",
      { className: "text-lg font-semibold" },
      document.name
    ),

    // Tipo
    React.createElement(
      "p",
      { className: "text-gray-600" },
      "Tipo: ",
      document.type
    ),

    // Botón
    React.createElement(
      "button",
      {
        className: "mt-2 px-3 py-1 bg-blue-600 text-white rounded-md",
      },
      "Ver documento"
    )
  );
}
