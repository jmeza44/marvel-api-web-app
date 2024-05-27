import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignInShellComponent } from './containers/sign-in-shell/sign-in-shell.component';
import { SignUpShellComponent } from './containers/sign-up-shell/sign-up-shell.component';
import { authFeatureState, authReducers } from './state/auth-index';
import { AuthEffects } from './state/effects/auth.effects';
import { SignOutComponent } from './components/sign-out/sign-out.component';

@NgModule({
  declarations: [
    SignInFormComponent,
    SignUpFormComponent,
    SignInShellComponent,
    SignUpShellComponent,
    SignOutComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureState, authReducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
