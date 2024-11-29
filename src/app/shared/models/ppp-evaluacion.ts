import { Evaluacion } from "./evaluacion";
import { PPP } from "./ppp.model";

export class PPPEvaluacion {
    id: number;
    ppp: PPP;
    evaluacion: Evaluacion;
    ruta_archivo: string;
    fecha_registro: string; // Puede cambiar a Date
    evidencia: string;
    nota: number;
    estado: number;
    constructor(
        id: number = 0,
        ppp: PPP = new PPP(),
        evaluacion: Evaluacion = new Evaluacion,
        ruta_archivo: string = '',
        fecha_registro: string = '',
        evidencia: string = '',
        nota: number = 0,
        estado: number = 0
      ) {
        this.id = id;
        this.ppp = ppp;
        this.evaluacion = evaluacion;
        this.ruta_archivo = ruta_archivo;
        this.fecha_registro = fecha_registro;
        this.evidencia = evidencia
        this.nota = nota;
        this.estado = estado;
      }
}