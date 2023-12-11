import { Injectable } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _snackBar: MatSnackBar) { }

  showMessage(message: string) {
    this._snackBar.open(message, undefined, {
      horizontalPosition: 'center',
       duration: 2000,
      verticalPosition: 'bottom',
    });
  }

}
