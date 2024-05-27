import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingCount = 0;
  isLoading = new BehaviorSubject<boolean>(false);

  showLoader() {
    this.loadingCount++;
    this.isLoading.next(true);
  }

  hideLoader() {
    if (this.loadingCount > 0) {
      this.loadingCount--;
    }
    if (this.loadingCount === 0) {
      this.isLoading.next(false);
    }
  }
}
