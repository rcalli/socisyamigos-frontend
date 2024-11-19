export class Acceso {
    id: number;
    nombre: string;
    estado: number;

    constructor(id: number = 0, nombre: string = '', estado: number = 0){
        this.id = id;
        this.nombre = nombre;
        this.estado = estado;
    }
}
