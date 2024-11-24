import { Persona } from "./persona";
import { Matricula } from "./matricula";

export class Estudiante {
  idestudiante: number;
  persona: Persona;
  codigo: string;
  estado: number;
  matriculas: Set<Matricula>;

  constructor(
    idestudiante: number = 0,
    persona: Persona = new Persona(),
    codigo: string = '',
    estado: number = 0,
    matriculas: Set<Matricula> = new Set<Matricula>()
  ) {
    this.idestudiante = idestudiante;
    this.persona = persona;
    this.codigo = codigo;
    this.estado = estado;
    this.matriculas = matriculas;
  }
}
