import { Routes } from '@angular/router';
import { AssociationComponent } from './association/association.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanManagementComponent } from './plan-management/plan-management.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'plans', component: PlanManagementComponent },
    { path: 'clients', component: ClientManagementComponent },
    { path: 'association', component: AssociationComponent },
];
