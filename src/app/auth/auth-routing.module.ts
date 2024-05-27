import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInShellComponent } from './containers/sign-in-shell/sign-in-shell.component';
import { SignUpShellComponent } from './containers/sign-up-shell/sign-up-shell.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    component: SignInShellComponent,
  },
  {
    path: 'sign-up',
    component: SignUpShellComponent,
  },
  {
    path: 'sign-out',
    component: SignOutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
