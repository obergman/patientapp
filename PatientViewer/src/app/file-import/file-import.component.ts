import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { PatientserviceService } from '../service/patientservice.service';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.css'],
  standalone: true,
  imports: [MatButtonModule]
})
export class FileImportComponent {

  @Input() requiredFileType: string = ".csv";
  @Output() afterImport = new EventEmitter();

  fileName = '';
  uploadProgress: number = 0;
  uploadSub: any;

  constructor(private http: HttpClient, private patientService: PatientserviceService) { }

  onFileSelected(event: any) {
    
    const file: File = event.target.files[0];
    
    if (file) {

      event.target.value = null;      
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("data", file);

      const upload$ = this.patientService.importPatients(formData)
        .pipe(
          finalize(() => this.reset())
        );

      this.uploadSub = upload$.subscribe(event => {
        this.reset();
        this.afterImport.emit();
      })
    }
  }

  reset() {    
    this.uploadSub = null;
  }


}
