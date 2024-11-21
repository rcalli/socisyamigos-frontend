import { Empresa } from "./empresa";
import { LineaCarrera } from "./linea-carrera";
import { Supervisor } from "./supervisor";


export interface PPP {
  id: number;
  empresa: Empresa;
  linea_carrera: LineaCarrera;
  supervisor: Supervisor;
  fechaInicio: string; // Puede cambiar a Date si se realiza una conversión
  fechaFin: string;
  horas: number;
  promedio: number;
  estado: number;
}


