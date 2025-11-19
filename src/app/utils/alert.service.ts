import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  //Show a success alert
  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonText: 'OK',
    });
  }

  //Show an error alert
  error(message: string) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'OK',
    });
  }

  //Show a confirm alert
  confirm(message: string): Promise<boolean> {
    return Swal.fire({
      icon: 'question',
      title: 'Are you sure?',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => result.isConfirmed);
  }

  //Show a info alert
  info(message: string) {
    return Swal.fire({
      icon: 'warning',
      title: 'Info',
      text: message,
      confirmButtonText: 'OK',
    });
  }
}
