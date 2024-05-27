import { createReducer, on } from '@ngrx/store';
import { UserProfile } from '../../../shared/models/auth/user-profile.model';
import { authActions } from '../actions/auth.actions';

const initialState: UserProfile = {
  email: '',
  username: '',
  fistName: '',
  lastName: '',
};

export const userProfileReducer = createReducer(
  initialState,
  on(authActions.loadProfileActions.loadProfile, (state) => state),
  on(
    authActions.loadProfileActions.loadProfileSuccess,
    (state, { userProfile }) => ({ ...state, ...userProfile }),
  ),
  on(authActions.loadProfileActions.loadProfileFailure, (_state) => ({
    email: '',
    username: '',
    fistName: '',
    lastName: '',
  })),
  on(authActions.signOutActions.signOut, () => ({
    email: '',
    username: '',
    fistName: '',
    lastName: '',
  })),
);
