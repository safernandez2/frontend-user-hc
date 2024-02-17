import axios, { AxiosResponse } from 'axios';

export const reservasApiUrl = 'https://backend-hosteriacap.onrender.com/reservas';

export interface Reserva {
  reservaid: number;  
  habitacionid: number;
  nombreCliente: string;
  correoCliente: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroCliente: string;
}

export const fetchReservas = async (): Promise<Reserva[]> => {
    const response: AxiosResponse<Reserva[]> = await axios.get(reservasApiUrl);
    return response.data;
  };
export const createReservas = async (data: Reserva | FormData): Promise<Reserva> => {
  try {
    const response: AxiosResponse<Reserva> = await axios.post(reservasApiUrl, data);
    return response.data;
  } catch (error) {
    console.error('Error al realizar la solicitud POST:', error);
    throw error; // Asegúrate de volver a lanzar el error para que pueda ser capturado por el bloque catch en el componente.
  }
};

export const obtenerFechasReservadas = async (habitacionid: number): Promise<Reserva[]> => {
  const response: AxiosResponse<Reserva[]> = await axios.get(`${reservasApiUrl}/fechasReservadas/${habitacionid}`);
  return response.data;
};