// src/agendamiento/pasos/Paso1Cesfam.js
import React, { useState, useEffect } from "react";
import { MapPin, Navigation, Clock, ChevronRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Backend/Firebase.js";

export default function Paso1Cesfam({ selectedCesfam, setSelectedCesfam, setStep, useGPS, setUseGPS }) {
  const [cesfams, setCesfams] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para calcular distancia aproximada entre coordenadas
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Obtener lista de CESFAM desde Firestore
  const fetchCesfams = async () => {
    try {
      const ref = collection(db, "cesfams");
      const snapshot = await getDocs(ref);

      let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      // Si no hay documentos, crear uno de ejemplo
      if (data.length === 0) {
        data = [
          {
            id: "demo-cesfam",
            name: "CESFAM Centro Demo",
            address: "Av. Siempre Viva 123",
            latitude: -38.7359,
            longitude: -72.5905,
            availableSlots: 5,
            travelTime: "10 min",
            distance: 0
          }
        ];
      }

      setCesfams(data);
    } catch (error) {
      console.error("Error obteniendo CESFAMs:", error);
      setCesfams([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para pedir ubicación del usuario
  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setUseGPS(true);
      },
      (err) => alert("No se pudo obtener ubicación: " + err.message)
    );
  };

  // Ordenar CESFAMs por distancia si hay ubicación
  useEffect(() => {
    if (useGPS && userLocation && cesfams.length > 0) {
      const sorted = [...cesfams].map((c) => ({
        ...c,
        distance: calcularDistancia(userLocation.latitude, userLocation.longitude, c.latitude, c.longitude)
      }));
      sorted.sort((a, b) => a.distance - b.distance);
      setCesfams(sorted);
    }
  }, [useGPS, userLocation]);

  // Cargar CESFAMs al iniciar
  useEffect(() => {
    fetchCesfams();
  }, []);

  if (loading) {
    return React.createElement("p", { className: "text-center mt-6" }, "Cargando CESFAMs...");
  }

  return React.createElement(
    "div",
    { className: "space-y-6" },
    // Título
    React.createElement(
      "div",
      { className: "text-center mb-8" },
      React.createElement("h2", { className: "text-3xl font-bold mb-2" }, "Selecciona tu CESFAM"),
      React.createElement("p", { className: "text-gray-600" }, "Encuentra el centro de salud más cercano a ti")
    ),
    // Opción GPS
    !useGPS &&
      React.createElement(
        "div",
        { className: "bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-6" },
        React.createElement(
          "div",
          { className: "flex items-start gap-4" },
          React.createElement(
            "div",
            { className: "w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0" },
            React.createElement(Navigation, { className: "text-white", size: 24 })
          ),
          React.createElement(
            "div",
            { className: "flex-1" },
            React.createElement("h3", { className: "font-bold text-lg mb-2" }, "Usa tu ubicación actual"),
            React.createElement(
              "p",
              { className: "text-gray-600 text-sm mb-4" },
              "Te mostraremos los CESFAM más cercanos a ti"
            ),
            React.createElement(
              "button",
              {
                onClick: requestLocation,
                className: "px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition"
              },
              "Activar GPS"
            )
          )
        )
      ),
    // Lista de CESFAMs
    React.createElement(
      "div",
      { className: "space-y-4" },
      cesfams.length > 0
        ? cesfams.map((cesfam) =>
            React.createElement(
              "button",
              {
                key: cesfam.id,
                onClick: () => {
                  setSelectedCesfam(cesfam);
                  setStep(2);
                },
                className: `w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-left group ${
                  selectedCesfam?.id === cesfam.id ? "ring-2 ring-emerald-500" : ""
                }`
              },
              React.createElement(
                "div",
                { className: "flex items-start justify-between mb-4" },
                React.createElement(
                  "div",
                  { className: "flex-1" },
                  React.createElement("h3", { className: "font-bold text-xl mb-1" }, cesfam.name),
                  React.createElement("p", { className: "text-gray-600 text-sm mb-3" }, cesfam.address),
                  React.createElement(
                    "div",
                    { className: "flex gap-4 text-sm" },
                    React.createElement(
                      "div",
                      { className: "flex items-center gap-1 text-emerald-600" },
                      React.createElement(MapPin, { size: 16 }),
                      React.createElement("span", null, `${cesfam.distance?.toFixed(2)} km`)
                    ),
                    React.createElement(
                      "div",
                      { className: "flex items-center gap-1 text-gray-600" },
                      React.createElement(Clock, { size: 16 }),
                      React.createElement("span", null, cesfam.travelTime)
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "text-right" },
                  React.createElement(
                    "div",
                    { className: "bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold mb-2" },
                    `${cesfam.availableSlots} horas`
                  ),
                  React.createElement(ChevronRight, { className: "text-gray-400 group-hover:text-emerald-600 transition", size: 24 })
                )
              )
            )
          )
        : React.createElement("p", { className: "text-center text-gray-500" }, "No hay CESFAMs disponibles.")
    )
  );
}
