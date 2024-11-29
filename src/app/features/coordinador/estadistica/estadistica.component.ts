import {Component, OnInit} from '@angular/core';
import {SidebarEstudianteComponent} from '../../sidebar/sidebar-estudiante/sidebar-estudiante.component';
import {HeaderComponent} from '../../header/header.component';
import {ChartData, ChartOptions} from 'chart.js';
import {PPPService} from '../../../core/services/ppp.service';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [
    SidebarEstudianteComponent,
    HeaderComponent,ChartModule
  ],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent implements OnInit {
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true, // Permitir que el gráfico cambie de tamaño
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#000',
        },
      },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#000',
        },
      },
      y: {
        ticks: {
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#000',
        },
      },
    },
  };

  constructor(private yourService: PPPService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.yourService.getAllPPPs().subscribe((ppps) => {
      const counts = { solicitado: 0, enInicio: 0, enProceso: 0, finalizado: 0 };

      ppps.forEach((ppp) => {
        const estado = ppp.estado;
        if (estado === 0) counts.solicitado++;
        else if (estado >= 1 && estado <= 4) counts.enInicio++;
        else if (estado >= 5 && estado <= 8) counts.enProceso++;
        else if (estado === 9) counts.finalizado++;
      });

      this.chartData = {
        labels: ['Solicitado', 'En inicio', 'En proceso', 'Finalizado'],
        datasets: [
          {
            label: 'PPP',
            data: [
              counts.solicitado,
              counts.enInicio,
              counts.enProceso,
              counts.finalizado,
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      };
    });
  }
}
