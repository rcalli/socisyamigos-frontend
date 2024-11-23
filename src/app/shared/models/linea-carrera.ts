import {Carrera} from './carrera';


export class LineaCarrera {
  id: number;
  carrera: Carrera;
  nombre: string;
  estado: number;

  constructor(id: number = 0, carrera: Carrera = new Carrera(), nombre: string = '', estado: number = 0) {
    this.id = id;
    this.carrera = carrera;
    this.nombre = nombre;
    this.estado = estado;
  }
}
