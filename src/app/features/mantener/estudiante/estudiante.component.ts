import { Component } from '@angular/core';
import {Button, ButtonDirective} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../header/header.component";
import {InputTextModule} from "primeng/inputtext";
import {MessageService, PrimeTemplate} from "primeng/api";
import {SidebarEstudianteComponent} from "../../sidebar/sidebar-estudiante/sidebar-estudiante.component";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {Estudiante} from '../../../shared/models/estudiante';
import {EstudianteService} from '../../../core/services/estudiante.service';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {NgIf} from '@angular/common';
import {Requisito} from '../../../shared/models/requisito';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    ConfirmDialogModule,
    DialogModule,
    FormsModule,
    HeaderComponent,
    InputTextModule,
    PrimeTemplate,
    SidebarEstudianteComponent,
    TableModule,
    ToastModule,
    DropdownModule,
    InputNumberModule,
    NgIf
  ],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.css'
})
export class EstudianteComponent {
  estudiantes:Estudiante[]=[];
  visible:boolean=false;
  isDeleteInProgress:boolean=false;
  estudiante=new Estudiante();
  titulo:string='';
  opc:string='';
  op = 0;


}
