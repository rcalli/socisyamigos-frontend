import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RequisitoService } from '../../../core/services/requisito.service';
import { Requisito } from '../../../shared/models/requisito';

@Component({
  selector: 'app-requisito',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,
    FormsModule,ConfirmDialogModule,ToastModule, DropdownModule],
  templateUrl: './requisito.component.html',
  styleUrl: './requisito.component.css'
})
export class RequisitoComponent {
  requisitos:Requisito[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  requisito=new Requisito();
  titulo:string='';
  opc:string='';
  op = 0; 
  constructor(
    private requisitoService: RequisitoService,
    private messageService: MessageService
  ){}
  ngOnInit(){
    this.listarRequisitoes();
  }
  listarRequisitoes(){
    this.requisitoService.getRequisitos().subscribe((data)=>{
      this.requisitos=data;
    });
  }
  showDialogCreate(){
    this.titulo="Crear Requisito"
    this.opc="Save";   
    this.op=0;
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  showDialogEdit(id:number){
    this.titulo="Editar Requisito"
    this.opc="Editar"; 
   this.requisitoService.getRequisitoById(id).subscribe((data)=>{
      this.requisito=data; 
      this.op=1;     
   });    
    this.visible = true; // Cambia la visibilidad del diálogo
  }
  deleteRequisito(id:number){
    this.isDeleteInProgress = true;
    this.requisitoService.deleteRequisito(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Requisito eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarRequisitoes();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la Requisito',
        });
      },
    });
  }
  opcion(){
    if(this.op==0){
      this.addRequisito();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editRequisito();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  addRequisito(){
    this.requisitoService.crearRequisito(this.requisito).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Requisito Registrada',
        });
        this.listarRequisitoes();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear la Requisito',
        });
      },
    });    
    this.visible = false;
  }
  editRequisito(){
    this.requisitoService.updateRequisito(this.requisito,this.requisito.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Requisito Editada',
        });
        this.listarRequisitoes();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la Requisito',
        });
      },
    });    
    this.visible = false;
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0; 
    this.requisito.id=0;
    this.requisito.nombre='';
    this.requisito.descripcion='';
    this.requisito.estado=0;
  }
}

