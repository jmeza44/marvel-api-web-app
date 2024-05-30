import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListShellComponent } from './containers/characters-list-shell/characters-list-shell.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CharactersListShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
