// HabitacionCard.tsx
import React, { useState } from 'react';
import { Card, Button } from 'antd';
import ModalAddReservation, { ModalAddReservationProps } from './ModalAddReservation';

interface Habitacion {
  habitacionid: number;
  nombreHabitacion: string;
  descripcion: string;
  capacidad: number;
  imagenUrl: string;
}

interface HabitacionCardProps {
  habitacion: Habitacion;
  onReservarClick: (habitacion: Habitacion) => void;
}

const HabitacionCard: React.FC<HabitacionCardProps> = ({ habitacion, onReservarClick }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleReservarClick = () => {
    onReservarClick(habitacion);
    setModalVisible(true);
  };

  

  const handleReservaFormCancel = () => {
    setModalVisible(false);
  };

  const handleAddReservationSuccess = () => {
    console.log('Reserva agregada con éxito');
  };

  const modalAddReservationProps: ModalAddReservationProps = {
    visible: modalVisible,
    onCancel: handleReservaFormCancel,
    onAddSuccess: handleAddReservationSuccess,
    habitacionid: habitacion.habitacionid,
  };

  return (
    <Card
      className="habitacion-card" // Clase para facilitar estilos específicos
      hoverable
      style={{
        width: '90%',
        margin: '40px 0',
        marginLeft: '1%',
        fontFamily: 'Pacifico, sans-serif', // Establece el tipo de letra aquí
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <img
            alt={habitacion.nombreHabitacion}
            src={habitacion.imagenUrl}
            style={{ width: '100%', height: '260px', objectFit: 'cover' }}
          />
        </div>
        <div style={{ textAlign: 'left', marginLeft: '70px', width: '50%', fontFamily: 'Lato, sans-serif' }}>
          <h3 style={{ fontSize: '30px', marginBottom: '8px' }}>{habitacion.nombreHabitacion}</h3>
          <p style={{ fontSize: '16px' }}><strong>Descripción:</strong> {habitacion.descripcion}</p>
          <p style={{ fontSize: '16px' }}><strong>Capacidad:</strong> {habitacion.capacidad} personas</p>
          <Button type="primary" style={{ background: 'rgb(35, 46, 58)', border: '1px solid black' }} onClick={handleReservarClick}>
            Reservar
          </Button>
        </div>
      </div>
      <ModalAddReservation {...modalAddReservationProps} />
    </Card>
  );
};

export default HabitacionCard;
