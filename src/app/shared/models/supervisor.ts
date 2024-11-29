import { Carrera } from "./carrera";
import { Persona } from "./persona";

export class Supervisor {
  id: number;
  persona: Persona;
  carrera: Carrera;
  estado: number;

  constructor(
    id: number = 0,
    persona: Persona = new Persona(),
    carrera: Carrera = new Carrera(),
    estado: number = 0
  ) {
    this.id = id;
    this.persona = persona;
    this.carrera = carrera;
    this.estado = estado;
  }
}
