import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Plan } from '../shared/models/plan.model';
import { TelecomService } from '../core/services/telecom.service';
import { SharedTableComponent } from '../shared/components/shared-table/shared-table.component';
import { SharedFormComponent } from '../shared/components/shared-form/shared-form.component';

@Component({
  selector: 'app-plan-management',
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatInputModule, 
    SharedTableComponent,
    SharedFormComponent
  ],
  templateUrl: './plan-management.component.html',
  styleUrls: ['./plan-management.component.css']
})
export class PlanManagementComponent implements OnInit {

  plans: Plan[] = [];
  displayedColumns: string[] = ['name', 'price', 'dataAllowance', 'voiceMinutes', 'actions'];
  planForm: FormGroup;
  selectedPlan: Plan | null = null;

  planColumns = [
    { key: 'name', header: 'Nome do Plano' },
    { key: 'price', header: 'Preço' },
    { key: 'dataAllowance', header: 'Franquia de Dados (GB)' },
    { key: 'voiceMinutes', header: 'Minutos Ligação' }
  ];
  
  planFields = [
    { key: 'name', label: 'Nome do Plano' },
    { key: 'price', label: 'Preço', type: 'number' },
    { key: 'dataAllowance', label: 'Franquia de Dados (GB)', type: 'number' },
    { key: 'voiceMinutes', label: 'Minutos Ligação', type: 'number' }
  ];

  @ViewChild('planDialog') planDialog!: TemplateRef<any>;

  constructor(private telecomService: TelecomService, public dialog: MatDialog) {
    this.planForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      dataAllowance: new FormControl('', Validators.required),
      voiceMinutes: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.telecomService.getPlans().subscribe(plans => {
      this.plans = plans;
    });
  }

  openPlanDialog(): void {
    const dialogRef = this.dialog.open(this.planDialog);
    dialogRef.afterClosed().subscribe(() => {
      this.planForm.reset();
      this.selectedPlan = null;
    });
  }

  editPlan(plan: Plan): void {
    this.selectedPlan = plan;
    this.planForm.patchValue(plan);
    this.openPlanDialog();
  }

  savePlan(event: any): void {
    
    if (this.planForm.invalid) {
      return;
    }
    const planData = this.planForm.value;
    if (this.selectedPlan) {
      const updatedPlan = { ...this.selectedPlan, ...planData };
      this.telecomService.updatePlan(updatedPlan).subscribe(() => {
        this.loadPlans();
        this.dialog.closeAll();
      });
    } else {
      this.telecomService.addPlan(planData).subscribe(() => {
        this.loadPlans();
        this.dialog.closeAll();
      });
    }
  }

  deletePlan(planId: string): void {
    
    this.telecomService.deletePlan(planId).subscribe(() => {
      this.loadPlans();
    });
  }

}
