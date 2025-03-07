import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientPlan } from '../shared/models/client-plan.model';
import { Client } from '../shared/models/client.model';
import { Plan } from '../shared/models/plan.model';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TelecomService } from '../core/services/telecom.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
  };
  public barChartType = 'bar' as const;

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: []
      },
    ],
  };



  cards = [
    { title: 'Total de Clientes', value: 0 },
    { title: 'Total de Planos', value: 0 },
    { title: 'Média de planos por cliente', value: 0 }
  ];
  clients: Client[] = [];
  plans: Plan[] = [];
  clientPlans: ClientPlan[] = [];


  constructor(private telecomService: TelecomService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.telecomService.getClients().subscribe(clients => {
      this.clients = clients;
      this.cards[0].value = clients.length;
      
    });

    this.telecomService.getPlans().subscribe(plans => {
      this.plans = plans;
      this.cards[1].value = plans.length;
    });

    this.telecomService.getClientPlans().subscribe(clientPlans => {
      
      this.clientPlans = clientPlans;
      this.updateAveragePlans();
      this.updateCharts();
    });
  }

  updateCharts(): void {
    const planCount = this.plans.map(plan => {      
      const count = this.clientPlans.filter(cp => cp.planId === plan.id).length;
      return { name: plan.name, count };
    });
    console.log(planCount);
    
    this.pieChartData.labels = planCount.map(pc => pc.name);
    this.pieChartData.datasets[0].data = planCount.map(pc => pc.count);
    
    this.barChartData.labels = planCount.map(pc => pc.name);
    this.barChartData.datasets[0].data = planCount.map(pc => pc.count);
    this.barChartData.datasets[0].label = 'plano';
    console.log(this.barChartData);
    
    console.log(this.pieChartData);
    console.log(this.barChartData);
    
    
  }


  updateAveragePlans(): void {
    const totalClientPlans = this.clientPlans.length;
    const average = this.clients.length ? (totalClientPlans / this.clients.length).toFixed(2) : 0;
    this.cards[2].value = average as number;
  }
  

}
