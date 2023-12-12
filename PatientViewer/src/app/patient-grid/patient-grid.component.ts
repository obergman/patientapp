import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Patient, PatientserviceService } from '../service/patientservice.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FileImportComponent } from '../file-import/file-import.component';
import { CommonService } from '../common.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css'],
  standalone: true,
  imports: [MatTableModule, FileImportComponent, MatDialogModule, MatSortModule, MatIconModule, FormsModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, CommonModule]
})
export class PatientGridComponent implements OnInit, AfterViewInit {


  patients: Patient[] = [];
  loaded: boolean = false;
  selectedRow: any;
  dataSource = new MatTableDataSource(this.patients);
  displayedColumns: string[] =  ['id', 'firstName', 'lastName', 'gender', 'dob', 'edit', 'delete'];

  @ViewChild(MatSort) sort!: MatSort;

  @Input() searchValue: string = "";

  constructor(
    private patientService: PatientserviceService,
    private commonSvc: CommonService,
    breakpointObserver: BreakpointObserver
    , public dialog: MatDialog) { 
      
      breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
        this.displayedColumns = result.matches ? 
          ['id','firstName', 'lastName', 'edit', 'delete']: 
          ['id', 'firstName', 'lastName', 'gender', 'dob', 'edit', 'delete'];
      });

    }

  getdata() {
    this.patientService.getPatients().subscribe((data) => {
      this.dataSource.data = data as Patient[];      
      this.loaded = true;
    });

  }

  select(row: any) {
    this.selectedRow = row;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;    
  }

  ngOnInit(): void {
    this.getdata();
  }

  edit(data: any) {
    this.selectedRow = data;
    this.openDialog();
  }

  delete(element: any) {
    if (confirm("Delete patient #" + element.id + ": " + element.firstName + " " + element.lastName + "?")) {
      this.patientService.deletePatient(element.id).subscribe((data) => {
        this.commonSvc.showMessage("Patient deleted.");
        this.getdata();
      });
    }


  }

  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }


  openDialog() {
    const dialogRef = this.dialog.open(PatientDialogComponent,
      {
        data: this.selectedRow
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result)
        return;

      this.patientService.updatePatient(result).subscribe((data) => {
        this.commonSvc.showMessage("Patient updated.");
        this.getdata();
      });

    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  sortData(sort: Sort) {

    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'firstName':
          return this.compare(a.firstName, b.firstName, isAsc);
        case 'lastName':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'gender':
          return this.compare(a.gender, b.gender, isAsc);
        default:
          return 0;
      }
    });
  }



}
