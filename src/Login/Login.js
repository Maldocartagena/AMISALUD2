import React, { useState } from "react";

export default function LoginPage({ onNavigate, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = (setter, msg) => {
    setter(msg);
    setTimeout(() => setter(""), 3500);
  };

  const handleLogin = () => {
    if (!username || !password) {
      showMessage(setErrorMessage, "Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    setTimeout(() => {
      setLoading(false);
      showMessage(setSuccessMessage, "Login exitoso!");

      if (onLogin) onLogin(username);
      onNavigate("dashboard");
    }, 800);
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
    
    // FORM BOX
    React.createElement(
      "div",
      { className: "bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md" },
      
      // Título
      React.createElement(
        "h1",
        { className: "text-center text-3xl font-bold text-gray-800 mb-8" },
        "Iniciar Sesión"
      ),
      
      // ERROR
      errorMessage && React.createElement(
        "div",
        { className: "bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm" },
        errorMessage
      ),
      
      // SUCCESS
      successMessage && React.createElement(
        "div",
        { className: "bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm" },
        successMessage
      ),
      
      // USERNAME
      React.createElement(
        "div",
        { className: "mb-4" },
        React.createElement("input", {
          type: "text",
          placeholder: "RUT o Correo",
          value: username,
          onChange: (e) => setUsername(e.target.value),
          onKeyPress: (e) => e.key === "Enter" && handleLogin(),
          className: "w-full p-3 border-2 border-gray-300 rounded-lg text-base transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
        })
      ),
      
      // PASSWORD
      React.createElement(
        "div",
        { className: "mb-4" },
        React.createElement("input", {
          type: "password",
          placeholder: "Clave Única",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          onKeyPress: (e) => e.key === "Enter" && handleLogin(),
          className: "w-full p-3 border-2 border-gray-300 rounded-lg text-base transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
        })
      ),
      
      // RECUPERAR CONTRASEÑA
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
      
      // BOTÓN LOGIN
      React.createElement(
        "button",
        {
          onClick: handleLogin,
          disabled: loading,
          className: "w-full py-3 rounded-lg text-white font-bold bg-gradient-to-br from-indigo-500 to-indigo-700 hover:shadow-lg hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed"
        },
        "Ingresar"
      ),
      
      // LOADING
      loading && React.createElement(
        "div",
        { className: "text-center text-indigo-600 text-sm mt-3" },
        "Verificando credenciales..."
      ),
      
      // LINK REGISTRO
      React.createElement(
        "p",
        { className: "text-center text-gray-600 text-sm mt-6" },
        "¿No tienes una cuenta? ",
        React.createElement(
          "a",
          {
            href: "#",
            onClick: () => onNavigate("registro"),
            className: "font-bold text-indigo-500 hover:text-indigo-700"
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