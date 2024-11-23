export class Persona {
  idpersona: number;
  nombre: string;
  apepat: string;
  apemat: string;
  direccion: string;
  dni: string;
  correo: string;
  telefono: string | null;
  estado: number;

  constructor(
    idpersona: number = 0,
    nombre: string = '',
    apepat: string = '',
    apemat: string = '',
    direccion: string = '',
    dni: string = '',
    correo: string = '',
    telefono: string | null = null,
    estado: number = 0
  ) {
    this.idpersona = idpersona;
    this.nombre = nombre;
    this.apepat = apepat;
    this.apemat = apemat;
    this.direccion = direccion;
    this.dni = dni;
    this.correo = correo;
    this.telefono = telefono;
    this.estado = estado;
  }
}
