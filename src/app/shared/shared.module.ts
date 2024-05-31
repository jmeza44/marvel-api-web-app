import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastComponent } from './components/toast/toast.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PaginatorComponent } from '../shared/components/paginator/paginator.component';


@NgModule({
  declarations: [NavBarComponent, FooterComponent, ToastComponent, HomePageComponent, LoadingSpinnerComponent, PaginatorComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NavBarComponent,
    FooterComponent,
    ToastComponent,
    LoadingSpinnerComponent,
    PaginatorComponent,
  ],
})
export class SharedModule {}
