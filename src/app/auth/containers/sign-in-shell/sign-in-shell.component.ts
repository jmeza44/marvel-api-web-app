import { Component } from '@angular/core';
import { SignInUser } from '../../../shared/models/auth/sign-in-user.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../state/auth-index';
import { authActions } from '../../state/actions/auth.actions';

@Component({
  templateUrl: './sign-in-shell.component.html',
  styleUrl: './sign-in-shell.component.scss',
})
export class SignInShellComponent {
  constructor(private authStore: Store<AuthState>) {}

  onSignIn(credentials: SignInUser): void {
    this.authStore.dispatch(authActions.signInActions.signIn({ credentials }));
  }
}
