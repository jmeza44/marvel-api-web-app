import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StarRatingModule } from 'angular-star-rating';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersListShellComponent } from './containers/characters-list-shell/characters-list-shell.component';
import { charactersFeatureState, charactersReducers } from './state/characters-index';
import { CharactersEffects } from './state/effects/characters.effects';
import { CharacterDetailsModalComponent } from './components/character-details-modal/character-details-modal.component';

@NgModule({
  declarations: [
    CharacterCardComponent,
    CharactersListShellComponent,
    CharacterDetailsModalComponent
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    StoreModule.forFeature(charactersFeatureState, charactersReducers),
    EffectsModule.forFeature([CharactersEffects]),
    StarRatingModule.forChild(),
  ],
})
export class CharactersModule {}
