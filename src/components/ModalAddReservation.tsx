import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Modal, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as reservasApi from '../service/reservasApi';

export interface ModalAddReservationProps {
  visible: boolean;
  onCancel: () => void;
  onAddSuccess?: () => void;
  habitacionid: number;
}

const ModalAddReservation: React.FC<ModalAddReservationProps> = ({ visible, onCancel, onAddSuccess, habitacionid }) => {
  const [form] = Form.useForm();
  const [fechas, setFechas] = useState<reservasApi.Reserva[]>([]);

  useEffect(() => {
    const obtenerFechas = async () => {
      try {
        const fechasReservadas = await reservasApi.obtenerFechasReservadas(habitacionid);
        setFechas(fechasReservadas);
      } catch (error) {
        console.error('Error al obtener fechas reservadas:', error);
      }
    };

    obtenerFechas();
  }, [habitacionid]);

  const disabledDate = (current: dayjs.Dayjs) => {
    return (
      current.isBefore(dayjs().startOf('day')) ||
      fechas.some(
        (reserva) =>
          current.isAfter(dayjs(reserva.fechaInicio).startOf('day')) &&
          current.isBefore(dayjs(reserva.fechaFin).startOf('day').add(1, 'day'))
      )
    );
  };

  const disabledTime = (current: dayjs.Dayjs | null, type: string) => {
    if (current === null) {
      return {};
    }

    if (fechas.some((reserva) => current.isSame(dayjs(reserva.fechaInicio), 'day'))) {
      if (type === 'start') {
        const fechaInicioReserva = dayjs(
          fechas.find((reserva) => current.isSame(dayjs(reserva.fechaInicio), 'day'))?.fechaInicio
        );
        return { disabledHours: () => Array.from({ length: fechaInicioReserva.hour() + 1 }, (_, i) => i) };
      } else if (type === 'end') {
        const fechaFinReserva = dayjs(
          fechas.find((reserva) => current.isSame(dayjs(reserva.fechaInicio), 'day'))?.fechaFin
        );
        return {
          disabledHours: () =>
            Array.from({ length: 24 - fechaFinReserva.hour() + 1 }, (_, i) => i + fechaFinReserva.hour()),
        };
      }
    }

    return {};
  };

  const dateRenderFin = (current: dayjs.Dayjs) => {
    const isReserved = fechas.some(
      (reserva) =>
        current.isAfter(dayjs(reserva.fechaInicio).startOf('day')) &&
        current.isBefore(dayjs(reserva.fechaFin).startOf('day').add(1, 'day'))
    );

    if (isReserved) {
      return (
        <div className="ant-picker-cell-inner" style={{ color: 'red' }}>
          {current.date()}
        </div>
      );
    }

    return <div className="ant-picker-cell-inner">{current.date()}</div>;
  };

  const onFinish = async (values: any) => {
    const fechaInicio = dayjs(values.fechaInicio).startOf('day');
    const fechaFin = dayjs(values.fechaFin).startOf('day');
  
    console.log('Fecha de inicio:', fechaInicio.format());
    console.log('Fecha de fin:', fechaFin.format());
    console.log('Valor de numeroCliente:', values.numeroCliente);
  
    if (!fechaInicio.isValid() || !fechaFin.isValid() || fechaFin.isBefore(fechaInicio)) {
      message.error('La fecha de fin debe ser posterior a la fecha de inicio');
      return;
    }
  
    // Nueva validación para comprobar que la fecha de fin no esté después de un día bloqueado
    const fechaBloqueada = fechas.find(
      (reserva) =>
        fechaFin.isAfter(dayjs(reserva.fechaInicio).startOf('day')) &&
        fechaFin.isBefore(dayjs(reserva.fechaFin).startOf('day').add(1, 'day'))
    );
  
    if (fechaBloqueada) {
      form.setFieldsValue({ fechaFin: null });
      message.error('La fecha de fin no puede ser después de un día bloqueado');
      return;
    }
  
    // Verificar si la fecha de fin está después de un día bloqueado
    const fechasBloqueadas = fechas.filter(
      (reserva) =>
        fechaInicio.isBefore(dayjs(reserva.fechaFin).startOf('day').add(1, 'day')) &&
        fechaFin.isAfter(dayjs(reserva.fechaInicio).startOf('day'))
    );
  
    if (fechasBloqueadas.length > 0) {
      form.setFieldsValue({ fechaFin: null });
      message.error('La fecha de fin está dentro del período de otra reserva ya existente.');
      return;
    }
  
    try {
      values.habitacionid = habitacionid;
      values.fechaInicio = fechaInicio.toISOString();
      values.fechaFin = fechaFin.toISOString();
  
      await reservasApi.createReservas(values);
      message.success('Reserva agregada correctamente');
      form.resetFields();
      onCancel();
      if (onAddSuccess) {
        onAddSuccess();
      }
    } catch (error) {
      console.error('Error al agregar Reserva:', error);
      message.error('Error al agregar Reserva');
    }
  };
  

  return (
    <Modal
      title="Agregar Reserva"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      bodyStyle={{ padding: '16px' }}
      style={{ top: 20 }}
      width={window.innerWidth < 768 ? '100%' : 520}
    >
      <Form form={form} name="form_add_reserva" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="nombreCliente"
          label="Nombre del Cliente"
          rules={[{ required: true, message: 'Ingrese el nombre del cliente' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
  name="numeroCliente"
  label="Numero del Cliente"
  rules={[
    { required: true, message: 'Ingrese el número del cliente' },
    { pattern: /^\d{1,10}$/, message: 'Ingrese hasta 10 números' },
  ]}
>
  <Input
    type="tel"
    maxLength={10}  // Limita la longitud del campo a 10 caracteres
    onKeyDown={(e) => {
      // Permitir solo números y teclas de control (como borrar, retroceso, etc.)
      if (!/^\d$/.test(e.key) && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
      }
    }}
  />
</Form.Item>

        <Form.Item
          name="correoCliente"
          label="Correo del Cliente"
          rules={[{ required: true, message: 'Ingrese el correo del cliente' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="fechaInicio"
              label="Fecha de Inicio"
              rules={[{ required: true, message: 'Seleccione la fecha de inicio' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                disabledTime={(current) => disabledTime(current, 'start')}
                style={{ width: '100%' }}
                inputReadOnly
                dateRender={(current) => {
                  const isReserved = fechas.some(
                    (reserva) =>
                      current.isAfter(dayjs(reserva.fechaInicio).startOf('day')) &&
                      current.isBefore(dayjs(reserva.fechaFin).startOf('day').add(1, 'day'))
                  );

                  if (isReserved) {
                    return (
                      <div className="ant-picker-cell-inner" style={{ color: 'red' }}>
                        {current.date()}
                      </div>
                    );
                  }

                  return <div className="ant-picker-cell-inner">{current.date()}</div>;
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="fechaFin" label="Fecha de Fin" rules={[{ required: true, message: 'Seleccione la fecha de fin' }]}>
              <DatePicker
                format="YYYY-MM-DD"
                disabledDate={(current) =>
                  current &&
                  (current < dayjs().startOf('day') || current < form.getFieldValue('fechaInicio') || disabledDate(current))
                }
                disabledTime={(current) => disabledTime(current, 'end')}
                style={{ width: '100%' }}
                inputReadOnly
                onChange={(fechaFin) => {
                  const fechaInicio = form.getFieldValue('fechaInicio');
                  if (fechaFin && fechaInicio && fechaFin.isBefore(dayjs(fechaInicio))) {
                    form.setFieldsValue({ fechaFin: null });
                    message.error('La fecha de fin debe ser posterior a la fecha de inicio');
                  }
                }}
                dateRender={dateRenderFin}
              />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'rgb(35, 46, 58)', width: '100%' }}>
          Agregar Reserva
        </Button>
      </Form>
    </Modal>
  );
};

export default ModalAddReservation;
