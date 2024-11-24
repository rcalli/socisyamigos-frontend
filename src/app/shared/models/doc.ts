import {DetallePPP} from "./detalle-ppp";


export class Doc {
  id?: number;
  detalle_ppp: DetallePPP;
  nombre: string;
  ruta_archivo: string;
  fecha: Date;
  estado: number;

  constructor(
    id?: number,
    detalle_ppp: DetallePPP = new DetallePPP(),
    nombre: string = '',
    ruta_archivo: string = '',
    fecha: Date = new Date(),
    estado: number = 0
  ) {
    this.id = id;
    this.detalle_ppp = detalle_ppp;
    this.nombre = nombre;
    this.ruta_archivo = ruta_archivo;
    this.fecha = fecha;
    this.estado = estado;
  }
}
