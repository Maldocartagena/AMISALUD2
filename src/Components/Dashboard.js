import React, { useEffect, useState } from "react";
import { Calendar, FileText, Clock, PlusCircle } from "lucide-react";
import Header from "./Header";
import AppointmentCard from "./AppointmentCard";
import DocumentCard from "./DocumentCard";
import { auth, db } from "../Backend/Firebase.js";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";

export default function Dashboard({ onLogout, onNavigate }) {
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Obtener datos del usuario
    const fetchUserData = async () => {
      if (!auth.currentUser) return;
      const userRef = doc(db, "usuarios", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Escucha en tiempo real de citas
    const qAppointments = query(
      collection(db, "citas"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribeAppointments = onSnapshot(qAppointments, snapshot => {
      const appts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appts);
    });

    // Escucha en tiempo real de documentos
    const qDocuments = query(
      collection(db, "documentos"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribeDocuments = onSnapshot(qDocuments, snapshot => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocuments(docs);
    });

    // Cleanup
    return () => {
      unsubscribeAppointments();
      unsubscribeDocuments();
    };
  }, []);

  return React.createElement(
    "div",
    { className: "min-h-screen bg-gray-50" },

    React.createElement(Header, { showNav: true, onLogout }),

    React.createElement(
      "main",
      { className: "max-w-7xl mx-auto px-4 py-8" },

      // Contenedor principal
      React.createElement(
        "div",
        { className: "flex items-start justify-between mb-8" },

        // Bloque verde de bienvenida
        React.createElement(
          "div",
          { className: "bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 text-white w-full md:w-3/4" },
          React.createElement(
            "h1",
            { className: "text-4xl font-bold mb-2" },
            `¡Hola, ${userData?.fullName || "Usuario"}! 👋`
          ),
          React.createElement(
            "p",
            { className: "text-emerald-50 text-lg" },
            "Bienvenido a tu centro de salud digital"
          )
        ),

        // Botón Agendar Cita
        React.createElement(
          "button",
          {
            onClick: () => onNavigate("agendamiento"),
            className:
              "ml-6 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-6 rounded-2xl shadow-xl text-lg flex items-center gap-3 transition"
          },
          React.createElement(PlusCircle, { size: 38 }),
          " Agendar Cita"
        )
      ),

      // Tarjetas estadísticas
      React.createElement(
        "div",
        { className: "grid md:grid-cols-3 gap-6 mb-8" },

        // Tarjeta 1: Citas
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-6 shadow-lg text-center" },
          React.createElement(Calendar, { className: "mx-auto mb-3", size: 32 }),
          React.createElement("h3", { className: "font-bold text-xl" }, "Citas Agendadas"),
          React.createElement("p", { className: "text-gray-600 text-lg" }, appointments.length)
        ),

        // Tarjeta 2: Documentos
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-6 shadow-lg text-center" },
          React.createElement(FileText, { className: "mx-auto mb-3", size: 32 }),
          React.createElement("h3", { className: "font-bold text-xl" }, "Documentos"),
          React.createElement("p", { className: "text-gray-600 text-lg" }, documents.length)
        ),

        // Tarjeta 3: Próxima Cita
        React.createElement(
          "div",
          { className: "bg-white rounded-2xl p-6 shadow-lg text-center" },
          React.createElement(Clock, { className: "mx-auto mb-3", size: 32 }),
          React.createElement("h3", { className: "font-bold text-xl" }, "Próxima Cita"),
          React.createElement(
            "p",
            { className: "text-gray-600 text-lg" },
            appointments.length > 0 ? appointments[0].date : "Sin citas"
          )
        )
      ),

      // Lista de próximas citas
      React.createElement("h2", { className: "text-2xl font-bold mt-4" }, "Próximas Citas"),
      React.createElement(
        "div",
        { className: "grid gap-4 md:grid-cols-2 mt-4" },
        appointments.map(a =>
          React.createElement(AppointmentCard, { key: a.id, appointment: a })
        )
      ),

      // Lista de documentos
      React.createElement("h2", { className: "text-2xl font-bold mt-8" }, "Documentos Disponibles"),
      React.createElement(
        "div",
        { className: "grid gap-4 md:grid-cols-2 mt-4" },
        documents.map(d =>
          React.createElement(DocumentCard, { key: d.id, document: d })
        )
      )
    )
  );
}
