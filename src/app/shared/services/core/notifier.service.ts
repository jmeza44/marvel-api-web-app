import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotifierService {
  private toastSubject = new BehaviorSubject<
    { type: string; title: string; message: string; }[]
  >([]);

  toast$ = this.toastSubject.asObservable();

  constructor() {}

  success(title: string, message: string) {
    const currentToasts = this.toastSubject.getValue();
    const updatedToasts = [
      ...currentToasts,
      { type: 'success', title, message },
    ];
    this.toastSubject.next(updatedToasts);
  }

  info(title: string, message: string) {
    const currentToasts = this.toastSubject.getValue();
    const updatedToasts = [...currentToasts, { type: 'info', title, message }];
    this.toastSubject.next(updatedToasts);
  }

  warning(title: string, message: string) {
    const currentToasts = this.toastSubject.getValue();
    const updatedToasts = [
      ...currentToasts,
      { type: 'warning', title, message },
    ];
    this.toastSubject.next(updatedToasts);
  }

  error(title: string, message: string) {
    const currentToasts = this.toastSubject.getValue();
    const updatedToasts = [...currentToasts, { type: 'error', title, message }];
    this.toastSubject.next(updatedToasts);
  }

  loadDataError(dataName: string) {
    const title = 'Failure';
    const message = `Error loading ${dataName}`;
    this.error(title, message);
  }

  invalidForm() {
    const title = 'Invalid form';
    const message = 'Complete the required fields';
    this.error(title, message);
  }
}
