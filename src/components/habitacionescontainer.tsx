import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import HabitacionCard from './habitacioncard';
import '../styles/habitaciones.css'; // Importa tu archivo de estilos

interface Habitacion {
  habitacionid: number;
  nombreHabitacion: string;
  descripcion: string;
  capacidad: number;
  imagenUrl: string;
}

const HabitacionesContainer: React.FC = () => {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Habitacion | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Simulación de carga de datos desde una API
    const fetchData = async () => {
      // Puedes reemplazar esto con tu lógica para obtener datos de la API
      const data = await fetch('https://backend-hosteriacap.onrender.com/habitaciones').then(response => response.json());
      setHabitaciones(data);
    };

    fetchData();
  }, []);

  const handleReservarClick = (habitacion: Habitacion) => {
    setSelectedRoom(habitacion);
    // Lógica para manejar la reserva
    // ...
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div className="habitaciones-container">
        {habitaciones.map(habitacion => (
          <HabitacionCard
            key={habitacion.habitacionid}
            habitacion={habitacion}
            onReservarClick={handleReservarClick}
          />
        ))}
        <Modal
          title={selectedRoom ? `Detalles de ${selectedRoom.nombreHabitacion}` : ''}
          visible={modalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          {selectedRoom && (
            <div>
              <p><strong>Descripción:</strong> {selectedRoom.descripcion}</p>
              <p><strong>Capacidad:</strong> {selectedRoom.capacidad} personas</p>
              {/* Elimina la referencia a la disponibilidad */}
            </div>
          )}
        </Modal>
      </div>

      {/* Pie de página */}
      <div style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p style={{ margin: '0', fontSize: '1.2em' }}>Hostería Capillapamba</p>
        <p style={{ margin: '0', fontSize: '0.9em' }}>Copyright © 2024, Developed by Pedro Pulgarin & Steven Fernandez.</p>
      </div>
    </div>
  )
};

export default HabitacionesContainer;