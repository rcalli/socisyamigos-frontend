import { Estudiante } from "./estudiante.model";
import { Plan_Carrera } from "./plan-carrera";
import { PPP } from "./ppp.model";

export class Matricula {
  id: number;
  estudiante: Estudiante;
  plan_carrera: Plan_Carrera;
  horas_totales: number;
  anio: number;
  estado: number;
  ppps: PPP[];  // Using array instead of Set for better TypeScript/Angular compatibility

  constructor(
    id: number = 0,
    estudiante: Estudiante = new Estudiante(),
    plan_carrera: Plan_Carrera = new Plan_Carrera(),
    horas_totales: number = 0,
    anio: number = 0,
    estado: number = 0,
    ppps: PPP[] = []
  ) {
    this.id = id;
    this.estudiante = estudiante;
    this.plan_carrera = plan_carrera;
    this.horas_totales = horas_totales;
    this.anio = anio;
    this.estado = estado;
    this.ppps = ppps;
  }
}
