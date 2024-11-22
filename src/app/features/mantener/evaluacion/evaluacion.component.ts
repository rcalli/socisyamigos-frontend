import { Component } from '@angular/core';
import { Evaluacion } from '../../../shared/models/evaluacion';
import { EvaluacionService } from '../../../core/services/evaluacion.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [TableModule, ButtonModule,DialogModule,RouterModule,InputTextModule,
    FormsModule,ConfirmDialogModule,ToastModule, DropdownModule, CommonModule],
  templateUrl: './evaluacion.component.html',
  styleUrl: './evaluacion.component.css'
})
export class EvaluacionComponent {
  evaluaciones:Evaluacion[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  evaluacion=new Evaluacion();
  titulo:string='';
  opc:string='';
  op = 0;
  constructor(
    private evaluacionService: EvaluacionService,
    private messageService: MessageService
  ){}
  ngOnInit(){
    this.listarEvaluaciones();
  }
  listarEvaluaciones(){
    this.evaluacionService.getEvaluaciones().subscribe((data)=>{
      this.evaluaciones=data;
    });
  }
  showDialogCreate(){
    this.titulo="Crear Evaluacion"
    this.opc="Save";
    this.op=0;
    this.visible = true; // Cambia la visibilidad
  }
  showDialogEdit(id:number){
    this.titulo="Editar Evaluacion"
    this.opc="Editar";
   this.evaluacionService.getEvaluacionById(id).subscribe((data)=>{
      this.evaluacion=data;
      this.op=1;
   });
    this.visible = true; // Cambia la visibilidad
  }
  deleteEvaluacion(id:number){
    this.isDeleteInProgress = true;
    this.evaluacionService.deleteEvaluacion(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Correcto',
          detail: 'Evaluacion eliminada',
        });
        this.isDeleteInProgress = false;
        this.listarEvaluaciones();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la Evaluacion',
        });
      },
    });
  }
  opcion(){
    if(this.op==0){
      this.addEvaluacion();
      this.limpiar();
    }else if(this.op==1){
      console.log("Editar");
      this.editEvaluacion();
      this.limpiar();
    }else{
      console.log("No se hace nada");
      this.limpiar();
    }
  }
  addEvaluacion(){
    this.evaluacionService.crearEvaluacion(this.evaluacion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Evaluacion Registrada',
        });
        this.listarEvaluaciones();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Crear la Evaluacion',
        });
      },
    });
    this.visible = false;
  }
  editEvaluacion(){
    this.evaluacionService.updateEvaluacion(this.evaluacion,this.evaluacion.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Evaluacion Editada',
        });
        this.listarEvaluaciones();
        this.op=0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo Editar la Evaluacion',
        });
      },
    });
    this.visible = false;
  }
  limpiar(){
    this.titulo='';
    this.opc='';
    this.op = 0;
    this.evaluacion.id=0;
    this.evaluacion.nombre='';
    this.evaluacion.estado=0;
  }
}
