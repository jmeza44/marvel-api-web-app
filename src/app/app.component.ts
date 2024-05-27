import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NotifierService } from './shared/services/core/notifier.service';
import { LocalStorageService } from './shared/services/core/local-storage.service';
import { AuthState } from './auth/state/auth-index';
import { Store } from '@ngrx/store';
import { authActions } from './auth/state/actions/auth.actions';

@Component({
  selector: 'marvel-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  toasts$ = this.notifierService.toast$;

  constructor(
    private authStore: Store<AuthState>,
    private notifierService: NotifierService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const access_token = this.localStorageService.getItem('access_token') as string;
    if (access_token !== undefined && access_token !== null && access_token !== '') this.authStore.dispatch(authActions.signInActions.signInSuccess({ authResponse: { access_token } }));
    initFlowbite();
  }
}
