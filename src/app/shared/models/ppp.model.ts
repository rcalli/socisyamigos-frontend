import { Empresa } from "./empresa";
import { LineaCarrera } from "./linea-carrera";
import { Matricula } from "./matricula";
import { Supervisor } from "./supervisor";


export class PPP {
  id: number;
  empresa: Empresa;
  linea_carrera: LineaCarrera;
  supervisor: Supervisor;
  matricula: Matricula
  fechaInicio: string; // Puede cambiar a Date
  fechaFin: string;
  horas: number;
  promedio: number;
  estado: number;

  constructor(
    id: number = 0,
    empresa: Empresa = new Empresa(),
    linea_carrera: LineaCarrera = new LineaCarrera(),
    supervisor: Supervisor = new Supervisor(),
    matricula: Matricula = new Matricula,
    fechaInicio: string = '',
    fechaFin: string = '',
    horas: number = 0,
    promedio: number = 0,
    estado: number = 0
  ) {
    this.id = id;
    this.empresa = empresa;
    this.linea_carrera = linea_carrera;
    this.supervisor = supervisor;
    this.matricula = matricula
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.horas = horas;
    this.promedio = promedio;
    this.estado = estado;
  }
}



