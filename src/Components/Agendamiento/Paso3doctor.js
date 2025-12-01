// src/agendamiento/pasos/Paso3Doctor.js
import React from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dra. María González', specialty: 'Medicina General', nextAvailable: 'Lun 18 Nov' },
  { id: 2, name: 'Dr. Carlos Muñoz', specialty: 'Medicina General', nextAvailable: 'Mar 19 Nov' },
  { id: 3, name: 'Dra. Patricia Silva', specialty: 'Medicina General', nextAvailable: 'Mié 20 Nov' }
];

function Paso3Doctor({ selectedCesfam, selectedSpecialty, setSelectedDoctor, setStep }) {
  const renderDoctor = (doctor) => {
    return React.createElement(
      'button',
      {
        key: doctor.id,
        onClick: () => {
          setSelectedDoctor(doctor);
          setStep(4);
        },
        className: 'w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-left group'
      },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between' },
        React.createElement(
          'div',
          { className: 'flex items-center gap-4' },
          React.createElement(
            'div',
            { className: 'w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center text-4xl' },
            '👨‍⚕️'
          ),
          React.createElement(
            'div',
            null,
            React.createElement('h3', { className: 'font-bold text-xl' }, doctor.name),
            React.createElement('p', { className: 'text-gray-600' }, doctor.specialty),
            React.createElement('p', { className: 'text-sm text-emerald-600 mt-1' }, `✓ Próxima disponibilidad: ${doctor.nextAvailable}`)
          )
        ),
        React.createElement(ChevronRight, { className: 'text-gray-400 group-hover:text-emerald-600 transition', size: 24 })
      )
    );
  };

  const doctorList = doctors.map(renderDoctor);

  return React.createElement(
    'div',
    { className: 'space-y-6' },
    React.createElement(
      'button',
      {
        onClick: () => setStep(2),
        className: 'text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4'
      },
      React.createElement(ChevronLeft, { size: 20 }),
      'Volver'
    ),
    React.createElement(
      'div',
      { className: 'bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-4 mb-6' },
      React.createElement(
        'div',
        { className: 'flex items-center justify-between text-sm' },
        React.createElement(
          'div',
          null,
          React.createElement('p', { className: 'text-gray-600' }, 'CESFAM'),
          React.createElement('p', { className: 'font-semibold' }, selectedCesfam?.name)
        ),
        React.createElement(
          'div',
          null,
          React.createElement('p', { className: 'text-gray-600' }, 'Especialidad'),
          React.createElement('p', { className: 'font-semibold' }, selectedSpecialty?.name)
        )
      )
    ),
    React.createElement('h2', { className: 'text-3xl font-bold mb-2' }, 'Selecciona profesional'),
    React.createElement('p', { className: 'text-gray-600 mb-6' }, 'Elige el médico de tu preferencia'),
    React.createElement('div', { className: 'space-y-4' }, doctorList)
  );
}

export default Paso3Doctor;
