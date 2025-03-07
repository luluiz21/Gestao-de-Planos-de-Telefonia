import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../models/shared-table.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-shared-table',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css']
})
export class SharedTableComponent {

  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  get displayedColumns(): string[] {
    return [...this.columns.map(col => col.key), 'actions'];
  }

}
