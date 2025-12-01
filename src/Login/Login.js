import React, { useState } from "react";
import { useAuth } from "../Backend/useAuth.js";

export default function Login({ onNavigate }) {
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showMessage = (setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 3000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage(setLocalError, "Por favor completa todos los campos");
      return;
    }

    const res = await login(email, password);

    if (!res) {
      showMessage(setLocalError, "Credenciales incorrectas");
      return;
    }

    // Exito
    showMessage(setSuccessMessage, "Inicio de sesión exitoso");
    setTimeout(() => {
      onNavigate("dashboard");
    }, 600);
  };

  return React.createElement(
    "div",
    { className: "min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-400 to-gray-200" },

    // LOGO
    React.createElement("img", {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Logo_del_MINSAL_Chile.png/1200px-Logo_del_MINSAL_Chile.png",
      alt: "Logo MINSAL",
      className: "w-52 mb-8 bg-white p-4 rounded-xl shadow-md"
    }),

    // BOX
    React.createElement(
      "div",
      { className: "bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md" },

      // TITULO
      React.createElement(
        "h1",
        { className: "text-center text-3xl font-bold text-gray-800 mb-8" },
        "Iniciar Sesión"
      ),

      // ERROR LOCAL
      localError &&
        React.createElement(
          "div",
          { className: "bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center" },
          localError
        ),

      // ERROR DEL HOOK
      error &&
        React.createElement(
          "div",
          { className: "bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center" },
          error
        ),

      // SUCCESS
      successMessage &&
        React.createElement(
          "div",
          { className: "bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm text-center" },
          successMessage
        ),

      // EMAIL
      React.createElement(
        "div",
        { className: "mb-4" },
        React.createElement("input", {
          type: "email",
          placeholder: "Correo electrónico",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          onKeyUp: (e) => e.key === "Enter" && handleLogin(),
          className:
            "w-full p-3 border-2 border-gray-300 rounded-lg text-base transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
        })
      ),

      // PASSWORD
      React.createElement(
        "div",
        { className: "mb-4" },
        React.createElement("input", {
          type: "password",
          placeholder: "Clave",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          onKeyUp: (e) => e.key === "Enter" && handleLogin(),
          className:
            "w-full p-3 border-2 border-gray-300 rounded-lg text-base transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
        })
      ),

      // FORGOT PASS
      React.createElement(
        "div",
        { className: "text-right mb-4" },
        React.createElement(
          "a",
          {
            href: "#",
            className: "text-indigo-500 hover:text-indigo-700 text-sm transition"
          },
          "¿Olvidaste tu contraseña?"
        )
      ),

      // LOGIN BUTTON
      React.createElement(
        "button",
        {
          onClick: handleLogin,
          disabled: loading,
          className:
            "w-full py-3 rounded-lg text-white font-bold bg-gradient-to-br from-indigo-500 to-indigo-700 hover:shadow-lg hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
        },
        loading ? "Verificando..." : "Ingresar"
      ),

      // REGISTRO
      React.createElement(
        "p",
        { className: "text-center text-gray-600 text-sm mt-6" },
        "¿No tienes una cuenta? ",
        React.createElement(
          "a",
          {
            href: "#",
            onClick: () => onNavigate("registro"),
            className: "font-bold text-indigo-600 hover:text-indigo-800"
          },
          "Regístrate aquí"
        )
      ),

      // VOLVER
      React.createElement(
        "button",
        {
          onClick: () => onNavigate("landing"),
          className: "w-full mt-6 text-gray-600 hover:text-gray-900 transition"
        },
        "← Volver al inicio"
      )
    )
  );
}
