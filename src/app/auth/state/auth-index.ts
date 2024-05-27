import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthResponse } from '../../shared/models/auth/auth-response.model';
import { UserProfile } from '../../shared/models/auth/user-profile.model';
import { signInReducer } from './reducers/sign-in.reducer';
import { userProfileReducer } from './reducers/user-profile.reducer';

export const authFeatureState = 'authState';

export interface AuthState {
  authResponse: AuthResponse;
  userProfile: UserProfile;
}

export const authReducers = {
  authResponse: signInReducer,
  userProfile: userProfileReducer,
};

const getAuthState = createFeatureSelector<AuthState>(authFeatureState);

const getAccessToken = createSelector(
  getAuthState,
  (state) => state.authResponse.access_token,
);

const getUserProfile = createSelector(
  getAuthState,
  (state) => state.userProfile,
);

const getIsAuthenticated = createSelector(
  getAuthState,
  (state) => state.userProfile.email !== null && state.userProfile.email !== undefined && state.userProfile.email !== '',
);

export const authSelectors = {
  getAuthState,
  getAccessToken,
  getUserProfile,
  getIsAuthenticated,
};
