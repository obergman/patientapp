import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, CommonModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PatientDialogComponent {

  patient: any = {};

  constructor(public dialogRef: MatDialogRef<PatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.patient = structuredClone(data);
  }

  close() {
    this.dialogRef.close(this.patient);
  }


}
