import { Carrera } from "./carrera";

export interface LineaCarrera {
  id: number;
  carrera: Carrera;
  nombre: string;
  estado: number;
}