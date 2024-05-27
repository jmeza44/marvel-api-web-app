import { createReducer, on } from '@ngrx/store';
import { AuthResponse } from '../../../shared/models/auth/auth-response.model';
import { authActions } from '../actions/auth.actions';

const initialState: AuthResponse = {
  access_token: '',
};

export const signInReducer = createReducer(
  initialState,
  on(authActions.signInActions.signIn, () => ({ access_token: '' })),
  on(
    authActions.signInActions.signInSuccess,
    (_state, action) => action.authResponse,
  ),
  on(authActions.signInActions.signInFailure, () => ({ access_token: '' })),
  on(authActions.signOutActions.signOut, () => ({ access_token: '' })),
);
