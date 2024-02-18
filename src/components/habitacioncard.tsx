import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      className="habitacion-card"
      hoverable
      style={{
        width: '90%',
        margin: isMobile ? '40px auto' : '40px 0', // Center on mobile, left align on desktop
        fontFamily: 'Pacifico, sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
        <div>
          <img
            alt={habitacion.nombreHabitacion}
            src={habitacion.imagenUrl}
            style={{ width: '100%', height: isMobile ? 'auto' : '260px', objectFit: 'cover' }}
          />
        </div>
        <div style={{ textAlign: 'left', marginLeft: isMobile ? '0' : '70px', width: isMobile ? '100%' : '50%', fontFamily: 'Lato, sans-serif' }}>
          <h3 style={{ fontSize: isMobile ? '24px' : '30px', marginBottom: '8px' }}>{habitacion.nombreHabitacion}</h3>
          <p style={{ fontSize: isMobile ? '14px' : '16px' }}><strong>Descripción:</strong> {habitacion.descripcion}</p>
          <p style={{ fontSize: isMobile ? '14px' : '16px' }}><strong>Capacidad:</strong> {habitacion.capacidad} personas</p>
          <Button type="primary" style={{ background: 'rgb(35, 46, 58)', border: '1px solid black', marginTop: isMobile ? '16px' : '0' }} onClick={handleReservarClick}>
            Reservar
          </Button>
        </div>
      </div>
      <ModalAddReservation {...modalAddReservationProps} />
    </Card>
  );
};

export default HabitacionCard;
