import React, { useState } from "react";
import Landing from "./Components/Landing.js";
import Login from "./Login/Login.js";
import Dashboard from "./Components/Dashboard.js";
import Registro from "./Login/Registro.js";
import Agendamiento from "./Components/Agendamiento.js";

export default function App() {
  const [page, setPage] = useState("landing");

  const handleLogout = () => {
    setPage("landing");
  };

  return React.createElement(
    React.Fragment,
    null,

    page === "landing"
      ? React.createElement(Landing, {
          goToLogin: () => setPage("login"),
        })
      : null,

    page === "login"
      ? React.createElement(Login, {
          onNavigate: setPage,
        })
      : null,

      page === "registro"
      ? React.createElement(Registro, {
          onNavigate: setPage,
        })
      : null,

     page === "dashboard"
      ? React.createElement(Dashboard, {
          onLogout: handleLogout,
          onNavigate: setPage,       // <-- AGREGADO
        })
      : null,
      
    page === "agendamiento"
      ? React.createElement(Agendamiento, {
           onGoToDashboard: () => setPage("dashboard"),
    })
  : null
  );
}
