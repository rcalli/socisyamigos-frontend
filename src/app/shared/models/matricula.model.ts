import { PPP } from './ppp.model';

export interface Matricula {
  id: number;
  horasTotales: number;
  anio: number;
  estado: number; // 1 para activa, 0 para inactiva
  ppps: PPP[];
}
