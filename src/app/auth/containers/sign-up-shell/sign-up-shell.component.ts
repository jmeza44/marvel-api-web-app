import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { SignUpUser } from '../../../shared/models/auth/sign-up-user.model';
import { authActions } from '../../state/actions/auth.actions';
import { AuthState } from '../../state/auth-index';

@Component({
  templateUrl: './sign-up-shell.component.html',
  styleUrl: './sign-up-shell.component.scss',
})
export class SignUpShellComponent {
  constructor(private authStore: Store<AuthState>) {}

  onSignUp(credentials: SignUpUser): void {
    this.authStore.dispatch(authActions.signUpActions.signUp({ credentials }));
  }
}
