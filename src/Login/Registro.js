import React, { useState } from "react";
import { useAuth } from "../Backend/useAuth.js";

export default function RegistroPage({ onNavigate }) {
  const { register, error, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleRegister() {
    if (!email || !password || !fullName || !rut) {
      setLocalError("Por favor completa todos los campos");
      setTimeout(() => setLocalError(""), 3000);
      return;
    }

    const ok = await register(email, password, { fullName, rut });

    if (ok) {
      setSuccessMessage("Cuenta creada con éxito");
      setTimeout(() => {
        onNavigate("login");
      }, 800);
    }
  }

  return React.createElement(
    "div",
    {
      className:
        "min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-400 to-gray-200"
    },

    // LOGO
    React.createElement("img", {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Logo_del_MINSAL_Chile.png/1200px-Logo_del_MINSAL_Chile.png",
      alt: "Logo MINSAL",
      className: "w-52 mb-8 bg-white p-4 rounded-xl shadow-md"
    }),

    // FORM
    React.createElement(
      "div",
      { className: "bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md" },

      // TITLE
      React.createElement(
        "h1",
        { className: "text-center text-3xl font-bold text-gray-800 mb-8" },
        "Crear Cuenta"
      ),

      // LOCAL ERROR
      localError &&
        React.createElement(
          "div",
          { className: "bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm" },
          localError
        ),

      // FIREBASE ERROR
      error &&
        React.createElement(
          "div",
          { className: "bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm" },
          error
        ),

      // SUCCESS
      successMessage &&
        React.createElement(
          "div",
          { className: "bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm" },
          successMessage
        ),

      // FULL NAME
      React.createElement("input", {
        type: "text",
        placeholder: "Nombre completo",
        value: fullName,
        onChange: (e) => setFullName(e.target.value),
        className:
          "w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
      }),

      // RUT
      React.createElement("input", {
        type: "text",
        placeholder: "RUT",
        value: rut,
        onChange: (e) => setRut(e.target.value),
        className:
          "w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
      }),

      // EMAIL
      React.createElement("input", {
        type: "email",
        placeholder: "Correo electrónico",
        value: email,
        onChange: (e) => setEmail(e.target.value),
        className:
          "w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
      }),

      // PASSWORD
      React.createElement("input", {
        type: "password",
        placeholder: "Crea una contraseña",
        value: password,
        onChange: (e) => setPassword(e.target.value),
        className:
          "w-full p-3 border-2 border-gray-300 rounded-lg mb-6 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
      }),

      // BUTTON REGISTRO
      React.createElement(
        "button",
        {
          onClick: handleRegister,
          disabled: loading,
          className:
            "w-full py-3 text-white font-bold bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        },
        loading ? "Creando cuenta..." : "Registrarme"
      ),

      // LINK LOGIN
      React.createElement(
        "p",
        { className: "text-center text-gray-600 text-sm mt-6" },
        "¿Ya tienes una cuenta? ",
        React.createElement(
          "span",
          {
            className: "font-bold text-green-500 hover:text-green-700 cursor-pointer",
            onClick: () => onNavigate("login")
          },
          "Inicia sesión aquí"
        )
      ),

      // VOLVER
      React.createElement(
        "button",
        {
          className:
            "w-full mt-6 text-gray-600 hover:text-gray-900 transition",
          onClick: () => onNavigate("landing")
        },
        "← Volver al inicio"
      )
    )
  );
}
