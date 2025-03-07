import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/models/client.model';
import { Plan } from '../shared/models/plan.model';
import { TelecomService } from '../core/services/telecom.service';
import { ClientPlan, ClientWithPlans } from '../shared/models/client-plan.model';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-association',
  imports: [CommonModule, DragDropModule, MatIconModule],
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})

export class AssociationComponent implements OnInit {
  clients: Client[] = [];
  plans: Plan[] = [];
  clientPlans: ClientPlan[] = [];
  
  availablePlans: Plan[] = [];
  
  clientsWithPlans: ClientWithPlans[] = [];

  isDraggingClientPlan = false;

  get dropListIdsCLients(): string[] {
    return ['trash', ...this.clientsWithPlans.map(clientData => 'client-' + clientData.client.id)];
  }

  get dropListIdsPlans(): string[] {
    return [ ...this.clientsWithPlans.map(clientData => 'client-' + clientData.client.id)];
  }

  constructor(private apiService: TelecomService) {}

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.apiService.getClients().subscribe(clients => {
      this.clients = clients;
      this.combineClientData();
    });
    this.apiService.getPlans().subscribe(plans => {
      this.plans = plans;
      this.availablePlans = [...plans];
      this.combineClientData();
    });
    this.apiService.getClientPlans().subscribe(clientPlans => {
      this.clientPlans = clientPlans;
      this.combineClientData();
    });
  }
  
  combineClientData(): void {
    if (!this.clients.length || !this.plans.length) return;
    
    this.clientsWithPlans = this.clients.map(client => {
      const assigned = this.clientPlans.filter(cp => cp.clientId === client.id)
        .map(cp => {
          const plan = this.plans.find(p => p.id === cp.planId);
          return { associationId: cp.id!, plan: plan! };
        });
      return { client, assignedPlans: assigned };
    });
  }
  
  onDragClientPlan(){    
    this.isDraggingClientPlan = true;
    
  }
  onAvailablePlansDrop(event: CdkDragDrop<Plan[]>): void {
    if (event.previousContainer !== event.container) {
      const draggedPlan: Plan = event.item.data;
      const clientId = event.previousContainer.id.replace('client-', '');
      const clientAssociation = this.clientPlans.find(cp => cp.clientId === clientId && cp.planId === draggedPlan.id);
      if (clientAssociation) {
        this.apiService.deleteClientPlan(clientAssociation.id!).subscribe(() => {
          this.clientPlans = this.clientPlans.filter(cp => cp.id !== clientAssociation.id);
          this.combineClientData();
        });
      }
    }
  }
  
  onClientDrop(event: CdkDragDrop<{ associationId: string, plan: Plan }[]>, clientData: ClientWithPlans): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(clientData.assignedPlans, event.previousIndex, event.currentIndex);
    } else {
      const draggedPlan: Plan = event.item.data;
      const alreadyAssociated = clientData.assignedPlans.find(item => item.plan.id === draggedPlan.id);
      if (alreadyAssociated) {
        return;
      }
      const newAssociation = { clientId: clientData.client.id, planId: draggedPlan.id };
      this.apiService.addClientPlan(newAssociation).subscribe(assoc => {
        this.clientPlans.push(assoc);
        this.combineClientData();
      });
    }
  }
  
  onTrashDrop(event: CdkDragDrop<any>): void {
    if (event.previousContainer.id.startsWith('client-')) {
      const draggedPlan: Plan = event.item.data;
      const clientId = event.previousContainer.id.replace('client-', '');
      const clientAssociation = this.clientPlans.find(cp => cp.clientId === clientId && cp.planId === draggedPlan.id);
      if (clientAssociation) {
        this.apiService.deleteClientPlan(clientAssociation.id!).subscribe(() => {
          this.clientPlans = this.clientPlans.filter(cp => cp.id !== clientAssociation.id);
          this.combineClientData();
        });
      }
    }
    this.isDraggingClientPlan = false;
  }

}
