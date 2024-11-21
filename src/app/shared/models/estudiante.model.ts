import { Matricula } from './matricula.model';

export interface Estudiante {
  id: number;
  codigo: string;
  nombre: string;
  apellido: string;
  dni: string;
  matriculas: {
    id: number;
    horasTotales: number;
    anio: number;
    estado: number; // 1 para activa, 0 para inactiva
    ppps: {
      id: number;
      fechaInicio: string; // Puede ser un Date si deseas trabajar con fechas directamente
      fechaFin: string;
      horas: number;
      promedio: number;
      estado: number; // 1 para activa, 0 para inactiva
      detalles: {
        id: number;
        requisito: string;
        estado: number; // 1 para completado, 0 para pendiente
      }[];
    }[];
  }[];
}

