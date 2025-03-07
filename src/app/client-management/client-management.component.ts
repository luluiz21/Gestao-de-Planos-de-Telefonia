import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Client } from '../shared/models/client.model';
import { TelecomService } from '../core/services/telecom.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedTableComponent } from '../shared/components/shared-table/shared-table.component';
import { SharedFormComponent } from '../shared/components/shared-form/shared-form.component';

@Component({
  selector: 'app-client-management',
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
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css']
})
export class ClientManagementComponent implements OnInit {

  clients: Client[] = [];
  displayedColumns: string[] = ['name', 'cpf', 'phone', 'email', 'actions'];
  clientForm: FormGroup;
  selectedClient: Client | null = null;

  clientColumns = [
    { key: 'name', header: 'Nome' },
    { key: 'cpf', header: 'CPF' },
    { key: 'phone', header: 'Telefone' },
    { key: 'email', header: 'Email' }
  ];
  
  clientFields = [
    { key: 'name', label: 'Nome' },
    { key: 'cpf', label: 'CPF'},
    { key: 'phone', label: 'Telefone'},
    { key: 'email', label: 'Email'}
  ];

  @ViewChild('clientDialog') clientDialog!: TemplateRef<any>;

  constructor(private telecomService: TelecomService, public dialog: MatDialog) {
    this.clientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.telecomService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  openClientDialog(): void {
    const dialogRef = this.dialog.open(this.clientDialog);
    dialogRef.afterClosed().subscribe(() => {
      this.clientForm.reset();
      this.selectedClient = null;
    });
  }

  editClient(client: Client): void {
    this.selectedClient = client;
    this.clientForm.patchValue(client);
    this.openClientDialog();
  }

  saveClient(event: any): void {
    if (this.clientForm.invalid) {
      return;
    }
    const clientData = this.clientForm.value;
    if (this.selectedClient) {
      const updatedClient = { ...this.selectedClient, ...clientData };
      this.telecomService.updateClient(updatedClient).subscribe(() => {
        this.loadClients();
        this.dialog.closeAll();
      });
    } else {
      this.telecomService.addClient(clientData).subscribe(() => {
        this.loadClients();
        this.dialog.closeAll();
      });
    }
  }

  deleteClient(clientId: string): void {
    this.telecomService.deleteClient(clientId).subscribe(() => {
      this.loadClients();
    });
  }

}
