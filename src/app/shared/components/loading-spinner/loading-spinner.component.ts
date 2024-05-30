import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/core/loader.service';

@Component({
  selector: 'marvel-loading-spinner',
  templateUrl: './loading-spinner.component.html'
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub!: Subscription;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loadingSub = this.loaderService.isLoading
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
