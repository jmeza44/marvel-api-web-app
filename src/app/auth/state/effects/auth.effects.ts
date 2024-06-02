import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, of, tap } from 'rxjs';
import { AuthenticationService } from '../../../shared/services/auth/authentication.service';
import { NotifierService } from '../../../shared/services/core/notifier.service';
import { authActions } from '../actions/auth.actions';
import { LocalStorageService } from '../../../shared/services/core/local-storage.service';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private notifier: NotifierService,
    private localStorageService: LocalStorageService,
    private authenticationService: AuthenticationService,
  ) {}

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signInActions.signIn),
      switchMap(({ credentials }) =>
        this.authenticationService.signIn(credentials).pipe(
          map((authResponse) =>
            authActions.signInActions.signInSuccess({ authResponse }),
          ),
          catchError((error: HttpErrorResponse) => of(authActions.signInActions.signInFailure({ httpErrorResponse: error }))),
        ),
      ),
    ),
  );

  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signInActions.signInSuccess),
      switchMap(({ authResponse }) => {
        this.localStorageService.addAccessToken(
          authResponse.access_token,
        );
        return this.authenticationService.loadProfile().pipe(
          map((userProfile) =>
            authActions.loadProfileActions.loadProfileSuccess({ userProfile }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              authActions.loadProfileActions.loadProfileFailure({
                httpErrorResponse: error,
              }),
            ),
          ),
        );
      }),
    ),
  );

  signInFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signInActions.signInFailure),
        tap(({ httpErrorResponse }) =>
          this.notifier.error('Sign In Error', httpErrorResponse.error['message']),
        ),
      ),
    { dispatch: false },
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUpActions.signUp),
      switchMap(({ credentials }) =>
        this.authenticationService.signUp(credentials).pipe(
          map((isUserCreated) =>
            isUserCreated
              ? authActions.signUpActions.signUpSuccess({ isUserCreated })
              : authActions.signUpActions.signUpAccountNotCreated({
                isUserCreated,
              }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              authActions.signUpActions.signUpFailure({
                httpErrorResponse: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  signUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signUpActions.signUpSuccess),
        tap(() => {
          this.notifier.success('Success Account Creation', 'Account successfully create, please sign in.');
          this.router.navigate(['auth', 'sign-in']);
        }),
      ),
    { dispatch: false },
  );

  signUpAccountNotCreated$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signUpActions.signUpAccountNotCreated),
        tap(() => this.notifier.error('Error creating the account', 'Unexpected error creating the account. Please, try again.')),
      ),
    { dispatch: false },
  );

  signUpFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.signUpActions.signUpFailure),
        tap(({ httpErrorResponse }) => this.notifier.error('Sign Up Error', httpErrorResponse.error['message'])
        ),
      ),
    { dispatch: false },
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadProfileActions.loadProfile),
      switchMap(() =>
        this.authenticationService.loadProfile().pipe(
          map((userProfile) => authActions.loadProfileActions.loadProfileSuccess({ userProfile })),
          catchError((error: HttpErrorResponse) => of(authActions.loadProfileActions.loadProfileFailure({ httpErrorResponse: error }))),
        ),
      ),
    ),
  );

  loadProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loadProfileActions.loadProfileSuccess),
        tap(({ userProfile }) => {
          this.notifier.success('Sign In Success', `Welcome, ${userProfile.username}!`);
          this.router.navigate(['/']);
        }),
      ),
    { dispatch: false },
  );

  loadProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loadProfileActions.loadProfileFailure),
        tap(({ httpErrorResponse }) =>
          this.notifier.error(
            'Loading Profile Error',
            httpErrorResponse.error['message'],
          ),
        ),
      ),
    { dispatch: false },
  );

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signOutActions.signOut),
    tap(() => this.router.navigate([""]))),
    { dispatch: false }
  );
}
