import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignInUser } from '../../../shared/models/auth/sign-in-user.model';
import { AuthResponse } from '../../../shared/models/auth/auth-response.model';
import { SignUpUser } from '../../../shared/models/auth/sign-up-user.model';
import { UserProfile } from '../../../shared/models/auth/user-profile.model';

const signInActions = createActionGroup({
  source: '[Auth API] Sign In',
  events: {
    'Sign In': props<{ credentials: SignInUser; }>(),
    'Sign In Success': props<{ authResponse: AuthResponse; }>(),
    'Sign In Failure': props<{ httpErrorResponse: HttpErrorResponse; }>(),
  },
});

const signUpActions = createActionGroup({
  source: '[Auth API] Sign Up',
  events: {
    'Sign Up': props<{ credentials: SignUpUser; }>(),
    'Sign Up Success': props<{ isUserCreated: true; }>(),
    'Sign Up Account Not Created': props<{ isUserCreated: false; }>(),
    'Sign Up Failure': props<{ httpErrorResponse: HttpErrorResponse; }>(),
  },
});

const signOutActions = createActionGroup({
  source: '[User Interaction] Sign Out',
  events: {
    'Sign Out': emptyProps(),
  },
});

const loadProfileActions = createActionGroup({
  source: '[Auth API] Load Profile',
  events: {
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ userProfile: UserProfile; }>(),
    'Load Profile Failure': props<{ httpErrorResponse: HttpErrorResponse; }>(),
  },
});

export const authActions = {
  signInActions,
  signUpActions,
  signOutActions,
  loadProfileActions,
};
