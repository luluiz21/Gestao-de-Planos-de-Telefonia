import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-shared-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './shared-form.component.html',
  styleUrls: ['./shared-form.component.css']
})
export class SharedFormComponent {
  
  @Input() formGroup!: FormGroup;
  @Input() fields: Array<{ key: string, label: string, type?: string }> = [];
  @Input() submitLabel = 'Salvar';
  @Output() submitForm = new EventEmitter<any>();

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.submitForm.emit(this.formGroup.value);
    }
  }

}
