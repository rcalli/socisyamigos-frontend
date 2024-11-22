export class Empresa {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string | null;
  email: string;
  estado: number;

  constructor(
    id: number = 0,
    nombre: string = '',
    direccion: string = '',
    telefono: string | null = null,
    email: string = '',
    estado: number = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.estado = estado;
  }
}
