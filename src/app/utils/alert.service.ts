import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

//i18n imports
import { I18nService } from '../i18n/i18n.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly i18n: I18nService) {}

  //Show a success alert
  success(message: string) {
    return Swal.fire({
      icon: 'success',
      title: this.i18n.t('swal.success'),
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
  confirm(question: string, message: string): Promise<boolean> {
    return Swal.fire({
      icon: 'question',
      title: question,
      text: message,
      showCancelButton: true,
      confirmButtonText: this.i18n.t('swal.yes') as string,
      cancelButtonText: this.i18n.t('swal.no') as string,
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
