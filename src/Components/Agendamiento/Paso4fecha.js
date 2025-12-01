import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { db } from '../../Backend/Firebase.js';
import { doc, onSnapshot } from 'firebase/firestore'; // solo doc y onSnapshot


const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00'];

function Paso4Fecha({ selectedCesfam, selectedDoctor, selectedDate, setSelectedDate, selectedTime, setSelectedTime, setStep }) {

// Calculamos los próximos 5 días desde hoy
  const next5Days = () => {
    const result = [];
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      result.push(`${weekdays[d.getDay()]} ${d.getDate()}`);
    }
    return result;
  };

  const [dates] = useState(next5Days());
  const [availableTimes, setAvailableTimes] = useState(times);

  // Escuchar cambios en tiempo real en Firestore
  useEffect(() => {
    if (!selectedCesfam || !selectedDoctor || !selectedDate) return;

    const docRef = doc(db, 'reservar cita', `${selectedCesfam.id}_${selectedDoctor.id}_${selectedDate}`);
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const reserved = docSnap.data().reservedTimes || [];
        setAvailableTimes(times.filter((t) => !reserved.includes(t)));
      } else {
        setAvailableTimes(times); // Todos disponibles si no hay doc
      }
    });

    return () => unsubscribe();
  }, [selectedCesfam, selectedDoctor, selectedDate]);

  const renderDate = (date) =>
    React.createElement(
      'button',
      {
        key: date,
        onClick: () => {
          setSelectedDate(date);
          setSelectedTime(null); // resetear hora
        },
        className: `py-3 px-4 rounded-xl font-semibold transition ${
          selectedDate === date ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
        }`
      },
      date
    );

  const renderTime = (time) =>
    React.createElement(
      'button',
      {
        key: time,
        onClick: () => setSelectedTime(time),
        className: `py-3 px-4 rounded-xl font-semibold transition ${
          selectedTime === time ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
        } ${availableTimes.includes(time) ? '' : 'opacity-50 cursor-not-allowed'}`,
        disabled: !availableTimes.includes(time)
      },
      time
    );

  return React.createElement(
    'div',
    { className: 'space-y-6' },
    // Botón volver
    React.createElement(
      'button',
      {
        onClick: () => setStep(3),
        className: 'text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4'
      },
      React.createElement(ChevronLeft, { size: 20 }),
      'Volver'
    ),
    React.createElement('h2', { className: 'text-3xl font-bold mb-2' }, 'Fecha y hora'),
    React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Selecciona cuándo quieres tu cita'),

    // Selección de fecha
    React.createElement(
      'div',
      { className: 'bg-white rounded-2xl p-6 shadow-lg mb-6' },
      React.createElement('h3', { className: 'font-bold text-lg mb-4' }, 'Selecciona fecha'),
      React.createElement('div', { className: 'grid grid-cols-5 gap-3' }, dates.map(renderDate))
    ),

    // Selección de hora
    selectedDate &&
      React.createElement(
        'div',
        { className: 'bg-white rounded-2xl p-6 shadow-lg mb-6' },
        React.createElement('h3', { className: 'font-bold text-lg mb-4' }, 'Hora disponible'),
        React.createElement('div', { className: 'grid grid-cols-4 gap-3' }, times.map(renderTime))
      ),

    // Botón continuar
    selectedDate &&
      selectedTime &&
      React.createElement(
        'button',
        {
          onClick: () => setStep(5),
          className:
            'w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition'
        },
        'Continuar a confirmación'
      )
  );
}

export default Paso4Fecha;
