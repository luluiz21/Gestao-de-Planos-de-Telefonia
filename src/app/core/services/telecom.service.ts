import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientPlan } from '../../shared/models/client-plan.model';
import { Client } from '../../shared/models/client.model';
import { Plan } from '../../shared/models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class TelecomService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${client.id}`, client);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${clientId}`);
  }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiUrl}/plans`);
  }

  addPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.apiUrl}/plans`, plan);
  }

  updatePlan(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}/plans/${plan.id}`, plan);
  }

  deletePlan(planId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plans/${planId}`);
  }

  getClientPlans(): Observable<ClientPlan[]> {
    return this.http.get<ClientPlan[]>(`${this.apiUrl}/clientPlans`);
  }

  addClientPlan(association: { clientId: string, planId: string }): Observable<ClientPlan> {
    return this.http.post<ClientPlan>(`${this.apiUrl}/clientPlans`, association);
  }

  deleteClientPlan(associationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clientPlans/${associationId}`);
  }
  

}
