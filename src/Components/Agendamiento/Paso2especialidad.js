// src/agendamiento/pasos/Paso2Especialidad.js
import React from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const specialties = [
  { id: 1, name: 'Medicina General', icon: '🏥', waitTime: '1-2 semanas' },
  { id: 2, name: 'Pediatría', icon: '👶', waitTime: '3-5 días' },
  { id: 3, name: 'Ginecología', icon: '👩‍⚕️', waitTime: '1-3 semanas' },
  { id: 4, name: 'Dental', icon: '🦷', waitTime: '2-4 semanas' }
];

function Paso2Especialidad({ selectedCesfam, setSelectedSpecialty, setStep }) {
  const renderSpecialty = (spec) => {
    return React.createElement(
      'button',
      {
        key: spec.id,
        onClick: () => {
          setSelectedSpecialty(spec);
          setStep(3);
        },
        className: 'bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-left group'
      },
      React.createElement(
        'div',
        { className: 'flex items-start justify-between mb-4' },
        React.createElement('div', { className: 'text-5xl mb-3' }, spec.icon),
        React.createElement(ChevronRight, { className: 'text-gray-400 group-hover:text-emerald-600 transition', size: 24 })
      ),
      React.createElement('h3', { className: 'font-bold text-xl mb-2' }, spec.name),
      React.createElement(
        'div',
        { className: 'flex items-center gap-2 text-sm text-gray-600' },
        React.createElement(Clock, { size: 16 }),
        React.createElement('span', null, `Espera: ${spec.waitTime}`)
      )
    );
  };

  const specialtyList = specialties.map(renderSpecialty);

  return React.createElement(
    'div',
    { className: 'space-y-6' },
    React.createElement(
      'button',
      {
        onClick: () => setStep(1),
        className: 'text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4'
      },
      React.createElement(ChevronLeft, { size: 20 }),
      'Volver'
    ),
    React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-6 mb-6 flex items-center gap-3' },
      React.createElement(MapPin, { className: 'text-emerald-600', size: 24 }),
      React.createElement(
        'div',
        null,
        React.createElement('p', { className: 'text-sm text-gray-600' }, 'Centro seleccionado'),
        React.createElement('p', { className: 'font-bold text-lg' }, selectedCesfam?.name)
      )
    ),
    React.createElement('h2', { className: 'text-3xl font-bold mb-2' }, 'Selecciona la especialidad'),
    React.createElement('p', { className: 'text-gray-600 mb-6' }, '¿Qué tipo de atención necesitas?'),
    React.createElement('div', { className: 'grid md:grid-cols-2 gap-4' }, specialtyList)
  );
}

export default Paso2Especialidad;
