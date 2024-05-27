import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/core/local-storage.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth-index';
import { authActions } from '../../state/actions/auth.actions';

@Component({
  selector: 'marvel-sign-out',
  template: ``,
  styles: `
    :host {
      display: block;
      width: 0;
      height: 0;
    }
  `
})
export class SignOutComponent implements OnInit {
  constructor(
    private authStore: Store<AuthState>,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.localStorageService.removeItem('access_token');
    this.authStore.dispatch(authActions.signOutActions.signOut());
  }

}
