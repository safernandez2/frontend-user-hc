import React from 'react';
import { Modal, Button } from 'antd';

interface ModalDetalleProps {
  visible: boolean;
  onClose: () => void;
  imagenSrc: string;
  descripcion: string;
  titulo: string;
}

const ModalDetalleComponent: React.FC<ModalDetalleProps> = ({ visible, onClose, imagenSrc, descripcion, titulo }) => {
  const getImageStyle = () => {
    const windowWidth = window.innerWidth;

    if (windowWidth > 768) {
      return {
        height: '300px',
        objectFit: 'cover',
        marginBottom: '16px',
      } as React.CSSProperties;
    } else {
      return {
        width: '100%', // Ajuste para dispositivos móviles
        height: 'auto',
        objectFit: 'contain',
        marginBottom: '16px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
      } as React.CSSProperties;
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      bodyStyle={{ padding: '24px' }}
    >
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '16px' }}>{titulo}</h2>
        <img
          src={imagenSrc}
          alt={titulo}
          style={getImageStyle()}
        />
        <p style={{ fontSize: getImageStyle().height === 'auto' ? '1em' : '1.2em' }}>
          {descripcion}
        </p>
        <Button type="primary" onClick={onClose} style={{ marginTop: '16px', backgroundColor: 'rgb(35, 46, 58)' }}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDetalleComponent;
