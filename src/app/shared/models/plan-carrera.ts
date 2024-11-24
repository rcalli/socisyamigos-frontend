import { Plan } from "./plan";
import { Carrera } from "./carrera";
import { Persona } from "./persona";
// import { Plan_Evaluacion } from "./plan-evaluacion";
import { Matricula } from "./matricula";
// import { Proceso_Requisito } from "./proceso-requisito";

export class Plan_Carrera {
  id: number;
  plan: Plan;
  carrera: Carrera;
  persona: Persona | null;  // Making it nullable since idpersona in JPA doesn't have nullable=false
  nCarta: number;
  estado: number;
  // plan_evaluaciones: Plan_Evaluacion[];  // Using arrays instead of Sets
  matriculas: Matricula[];
  // proceso_requisitos: Proceso_Requisito[];

  constructor(
    id: number = 0,
    plan: Plan = new Plan(),
    carrera: Carrera = new Carrera(),
    persona: Persona | null = null,
    nCarta: number = 0,
    estado: number = 0,
    // plan_evaluaciones: Plan_Evaluacion[] = [],
    matriculas: Matricula[] = [],
    // proceso_requisitos: Proceso_Requisito[] = []
  ) {
    this.id = id;
    this.plan = plan;
    this.carrera = carrera;
    this.persona = persona;
    this.nCarta = nCarta;
    this.estado = estado;
    // this.plan_evaluaciones = plan_evaluaciones;
    this.matriculas = matriculas;
    // this.proceso_requisitos = proceso_requisitos;
  }
}
