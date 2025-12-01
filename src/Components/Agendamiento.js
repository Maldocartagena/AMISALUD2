// src/agendamiento/Agendamiento.js
import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import Paso1Cesfam from "./Agendamiento/Paso1cesfam";
import Paso2Especialidad from "./Agendamiento/Paso2especialidad";
import Paso3Doctor from "./Agendamiento/Paso3doctor";
import Paso4Fecha from "./Agendamiento/Paso4fecha";
import Paso5Confirmacion from "./Agendamiento/Paso5confirmar";

const Agendamiento = ({ onGoToDashboard }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  const [step, setStep] = useState(1);
  const [selectedCesfam, setSelectedCesfam] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [useGPS, setUseGPS] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  if (!userId) {
    return React.createElement(
      "div",
      { className: "p-4 text-red-600" },
      "⚠️ No se pudo identificar al usuario. Inicia sesión nuevamente."
    );
  }

  const pasos = {
    1: React.createElement(Paso1Cesfam, {
      setStep,
      selectedCesfam,
      setSelectedCesfam,
      useGPS,
      setUseGPS,
      userLocation,
      setUserLocation
    }),
    2: React.createElement(Paso2Especialidad, {
      setStep,
      selectedSpecialty,
      setSelectedSpecialty,
      selectedCesfam
    }),
    3: React.createElement(Paso3Doctor, {
      setStep,
      selectedDoctor,
      setSelectedDoctor,
      selectedSpecialty,
      selectedCesfam
    }),
    4: React.createElement(Paso4Fecha, {
      setStep,
      selectedDate,
      setSelectedDate,
      selectedTime,
      setSelectedTime
    }),
    5: React.createElement(Paso5Confirmacion, {
      selectedCesfam,
      selectedSpecialty,
      selectedDoctor,
      selectedDate,
      selectedTime,
      userId,
      onGoToDashboard   // <<--- AQUÍ LO PASAMOS
    })
  };

  return pasos[step] || null;
};

export default Agendamiento;
