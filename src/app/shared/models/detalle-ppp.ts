import { Persona } from "./persona";
import { PPP } from "./ppp.model";
import { Proceso } from "./proceso";
import { Requisito } from "./requisito";

export class DetallePPP {
  id: number;
  ppp: PPP;
  proceso: Proceso;
  requisito: Requisito;
  persona: Persona;
  orden: number;
  estado: number;
  progress?: number; // Progreso específico de la subida
  uploading?: boolean; // Estado de subida
  message?: string; // Mensaje específico

  constructor(
    id: number = 0,
    ppp: PPP = new PPP(),
    proceso: Proceso = new Proceso(),
    requisito: Requisito = new Requisito(),
    persona: Persona = new Persona(),
    orden: number = 0,
    estado: number = 0,
  ) {
    this.id = id;
    this.ppp = ppp;
    this.proceso = proceso;
    this.requisito = requisito;
    this.persona = persona;
    this.orden = orden;
    this.estado = estado;
  }
}
