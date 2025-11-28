import React, { useState, useEffect } from "react";

export default function Registro({ onNavigate }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [strength, setStrength] = useState("");

  // Cambiar fondo según la página
  useEffect(() => {
    document.body.classList.add("registro-page");
    return () => document.body.classList.remove("registro-page");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Indicador de fuerza
    const pwd = e.target.value;
    if (pwd.length < 4) setStrength("weak");
    else if (pwd.length < 8) setStrength("medium");
    else setStrength("strong");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registro exitoso (sin backend)");
    onNavigate("login");
  };

  return React.createElement(
    "div",
    { className: "min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-300 to-green-400" },
    
    // LOGO
    React.createElement("img", {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Logo_del_MINSAL_Chile.png/1200px-Logo_del_MINSAL_Chile.png",
      alt: "Logo MINSAL",
      className: "w-40 mb-6 bg-white p-4 rounded-xl shadow-lg"
    }),
    
    // FORM CONTAINER
    React.createElement(
      "div",
      { className: "bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md" },
      
      // Título
      React.createElement(
        "h1",
        { className: "text-3xl font-bold text-center text-gray-700 mb-6" },
        "Crear Cuenta"
      ),
      
      // FORM
      React.createElement(
        "form",
        { onSubmit: handleSubmit },
        
        // NOMBRE
        React.createElement(
          "div",
          { className: "mb-4" },
          React.createElement(
            "label",
            { className: "block mb-1 text-gray-600 font-medium" },
            "Nombre"
          ),
          React.createElement("input", {
            type: "text",
            name: "nombre",
            value: form.nombre,
            onChange: handleChange,
            className: "w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500",
            required: true
          })
        ),
        
        // RUT
        React.createElement(
          "div",
          { className: "mb-4" },
          React.createElement(
            "label",
            { className: "block mb-1 text-gray-600 font-medium" },
            "RUT"
          ),
          React.createElement("input", {
            type: "text",
            name: "rut",
            value: form.nombre,
            onChange: handleChange,
            className: "w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500",
            required: true
          })
        ),
        
        // EMAIL
        React.createElement(
          "div",
          { className: "mb-4" },
          React.createElement(
            "label",
            { className: "block mb-1 text-gray-600 font-medium" },
            "Correo"
          ),
          React.createElement("input", {
            type: "email",
            name: "email",
            value: form.email,
            onChange: handleChange,
            className: "w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500",
            required: true
          })
        ),
        
        // PASSWORD
        React.createElement(
          "div",
          { className: "mb-2" },
          React.createElement(
            "label",
            { className: "block mb-1 text-gray-600 font-medium" },
            "Clave unica"
          ),
          React.createElement("input", {
            type: "password",
            name: "password",
            value: form.password,
            onChange: handleChange,
            className: "w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500",
            required: true
          })
        ),
        
        // CONFIRMAR PASSWORD
        React.createElement(
          "div",
          { className: "mb-2" },
          React.createElement(
            "label",
            { className: "block mb-1 text-gray-600 font-medium" },
            "Confirmar Clave unica"
          ),
          React.createElement("input", {
            type: "password",
            name: "confirmPassword",
            value: form.password,
            onChange: handleChange,
            className: "w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500",
            required: true
          })
        ),
        
        // INDICADOR DE FUERZA
        React.createElement(
          "div",
          { className: "h-2 bg-gray-300 rounded mt-2 mb-6 overflow-hidden" },
          React.createElement("div", {
            className: `h-full transition-all duration-300 
              ${strength === "weak" && "bg-red-500 w-1/3"}
              ${strength === "medium" && "bg-yellow-500 w-2/3"}
              ${strength === "strong" && "bg-green-500 w-full"}
            `
          })
        ),
        
        // BOTÓN SUBMIT
        React.createElement(
          "button",
          {
            type: "submit",
            className: "w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          },
          "Registrarme"
        ),
        
        // NAV A LOGIN
        React.createElement(
          "p",
          { className: "text-center text-gray-600 mt-4" },
          "¿Ya tienes cuenta? ",
          React.createElement(
            "button",
            {
              type: "button",
              className: "font-bold text-green-600 hover:text-green-400",
              onClick: () => onNavigate("login")
            },
            "Inicia sesión"
          )
        )
      )
    )
  );
}