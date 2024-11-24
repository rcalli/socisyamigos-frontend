import { Persona } from "./persona";
import { PPP } from "./ppp.model";
import { Proceso } from "./proceso";
import { Requisito } from "./requisito";

export interface DetallePPP {
  id: number;
  ppp: PPP;
  proceso: Proceso;
  requisito: Requisito;
  persona: Persona;
  orden: number;
  estado: number;
}