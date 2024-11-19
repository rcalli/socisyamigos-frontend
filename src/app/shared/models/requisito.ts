export class Requisito {
    id: number;
    nombre: string;
    descripcion: string;
    estado: number;

    constructor(id: number = 0, nombre: string = '', descripcion: string = '',estado: number = 0){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }
}
