import { Carrera } from "./carrera";
import { Persona } from "./persona";

export interface Supervisor {
    id: number;
    persona: Persona;
    carrera: Carrera;
    estado: number;
  }