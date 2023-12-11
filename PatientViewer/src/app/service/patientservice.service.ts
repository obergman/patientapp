import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

export class Patient {
  public id: number = 0;
  public firstName: string = "";
  public lastName: string = "";
  public gender: string = "";
  public dob?: Date;
}


@Injectable({
  providedIn: 'root'
})
export class PatientserviceService {

  urlApi: string;

  constructor(private http: HttpClient, @Inject('API_BASE_URL') _urlApi: string) {
    this.urlApi = _urlApi;
  }

  updatePatient(result: any) {
    return this.http.put(this.urlApi + '/Patients/' + result.id, result);
  }

  getPatients() {
    return this.http.get(this.urlApi + '/Patients');
  }

  deletePatient(id: any) {
    return this.http.delete(this.urlApi + '/Patients/' + id);
  }

  importPatients(formData: any) {
    return this.http.post(this.urlApi + '/Patients/upload', formData,
      {
        reportProgress: false,
        observe: 'events'
      });

  }

}
