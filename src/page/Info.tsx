import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imagen from '../images/fondo.jpeg';
import logo from '../images/logo.png';
import '../styles/info.css';
import imgCapilla from '../images/Imagen 35.jpg';
import ModalDetalleComponent from '../components/infodetalle'; 

import pescadeportiva from '../images/Imagen 33.jpg';  
import gastronomia from '../images/Imagen 7.jpg';  
import habitacionesR from '../images/Imagen 5.jpg'; 
import habitacion1 from '../images/imagen 1.jpg';
import habitacion2 from '../images/Imagen 3.jpg';
import habitacion3 from '../images/Imagen 4.jpg';
import habitacion4 from '../images/Imagen 6.jpg';
import tuImagen from '../images/imagen 2.jpg';
import Menu from '../images/imagen 20.jpg';

const InfoComponent: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState({ imagenSrc: '', descripcion: '', titulo: '' });
  const sliderRef = useRef<Slider>(null);

  const handleEmpezarClick = () => {
    console.log('Empezar clickeado');
    navigate('/habitaciones');
  };

  const handleDetalleClick = (index: number) => {
    const habitacionIndex = index % habitaciones.length;
    const habitacion = habitaciones[habitacionIndex];
    setDetalleSeleccionado(habitacion);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const menuDriveLink = 'https://drive.google.com/file/d/1GGNz-UpEmOfQC6sKX38HcAZFOcOLE36a/view';

  const nombresHabitaciones = [
    'Pescadeportiva',
    'Gastronomía',
    'Habitación Regular',
    'Habitación de Lujo',
    'Habitación Familiar',
    'Suite Presidencial',
    'Habitación VIP',
  ];

  const habitaciones = [
    { imagenSrc: pescadeportiva, descripcion: 'Descripción de la habitacion 1: Precio:', titulo: 'Imagenes de la habitación 1' },
    { imagenSrc: gastronomia, descripcion: 'Descripción de la habitacion 2: Precio:', titulo: 'Imagenes de la habitación 2' },
    { imagenSrc: habitacionesR, descripcion: 'Descripción de la habitacion 3: Precio:', titulo: 'Imagenes de la habitación 3' },
    { imagenSrc: habitacion1, descripcion: 'Descripción de la habitacion 4: Precio:', titulo: 'Imagenes de la habitación 4' },
    { imagenSrc: habitacion2, descripcion: 'Descripción de la habitacion 5: Precio:', titulo: 'Imagenes de la habitación 5' },
    { imagenSrc: habitacion3, descripcion: 'Descripción de la habitacion 6: Precio:', titulo: 'Imagenes de la habitación 6' },
    { imagenSrc: habitacion4, descripcion: 'Descripción de la habitacion 7: Precio:', titulo: 'Imagenes de la habitación 7' },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div>
      <div className="info-container">
        <div className="background-image" style={{ backgroundImage: `url(${imagen})` }} />
        <div className="overlay">
          <img className="logo" src={logo} alt="Logo" />
          <h1 id="capillapamba" style={{ fontFamily: 'Pacifico, sans-serif', fontSize: '1.5em', fontStyle: 'italic', color: '#ffffff', zIndex: 2 }}>Capillapamba</h1>
          <h3 id="frase" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2em', fontWeight: 'bold', color: '#ffffff', zIndex: 2 }}>
            "La riqueza de lo natural a tu alcance"
          </h3>
          <Button type="primary" size="large" className="start-button" onClick={handleEmpezarClick} >Reservar</Button>
        </div>
      </div>

      <div className="seccion-quienes-somos" style={{ backgroundColor: '#f5f5f5', padding: '70px', marginTop: '50px', textAlign: 'center' }}>
        {/* Contenido de "Quiénes Somos" */}
      </div>

      <div className="seccion-detalles" style={{ marginTop: '70px', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
        <h2 style={{ fontFamily: 'Pacifico, sans-serif', marginBottom: '20px', fontSize: '2em', color: '#333' }}>Habitaciones</h2>
        <Slider ref={sliderRef} {...settings}>
          {habitaciones.map((habitacion, index) => (
            <div key={index} style={{ flex: 1, textAlign: 'center', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => handleDetalleClick(index)}>
              <img src={habitacion.imagenSrc} alt={`Detalle ${nombresHabitaciones[index]}`} style={{ width: '80%', height: '80%', borderRadius: '10px', cursor: 'pointer' }} />
              <p style={{ fontSize: '1em', color: '#333', marginTop: '10px', alignSelf: 'center' }}>{nombresHabitaciones[index]}</p>
            </div>
          ))}
        </Slider>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" onClick={goToPrev} style={{ marginRight: '10px', backgroundColor:'rgb(35 46 58)' }}>Anterior</Button>
          <Button type="primary" onClick={goToNext} style={{backgroundColor:'rgb(35 46 58)'}}>Siguiente</Button>
        </div>
      </div>

      <div className="seccion-menu" style={{ marginTop: '50px', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
        {/* Contenido del Menú */}
      </div>

      <div className="seccion-frase-imagen" style={{ marginTop: '50px', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px' }}>
        {/* Contenido de la frase e imagen inspiradora */}
      </div>

      <div style={{ backgroundColor: '#333', color: '#fff', textAlign: 'center', padding: '20px' }}>
        <p style={{ margin: '0', fontSize: '1.2em' }}>Hostería Capillapamba</p>
        <p style={{ margin: '0', fontSize: '0.9em' }}>Copyright © 2024, Developed by Pedro Pulgarin & Steven Fernandez.</p>
      </div>

      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={800} // Ajusta el ancho del modal según sea necesario
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <h2>{detalleSeleccionado.titulo}</h2>
            <p>{detalleSeleccionado.descripcion}</p>
            {[0, 1, 2].map(i => (
              <img key={i} src={detalleSeleccionado.imagenSrc} alt={detalleSeleccionado.titulo} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InfoComponent;
