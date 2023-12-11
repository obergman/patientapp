import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { PatientGridComponent } from './patient-grid/patient-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileImportComponent } from './file-import/file-import.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarModule
} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PatientGridComponent,
    FileImportComponent,

    HttpClientModule,
     BrowserAnimationsModule,
     MatNativeDateModule,
     MatSnackBarModule
    
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
