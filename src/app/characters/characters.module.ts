import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { booksFeature } from './reducers/characters-api.reducer';

@NgModule({
  declarations: [CharactersComponent],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    StoreModule.forFeature(booksFeature),
  ],
})
export class CharactersModule {}
