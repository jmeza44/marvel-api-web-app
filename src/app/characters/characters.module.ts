import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StarRatingModule } from 'angular-star-rating';

import { SharedModule } from '../shared/shared.module';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharactersListShellComponent } from './containers/characters-list-shell/characters-list-shell.component';
import { charactersFeatureState, charactersReducers } from './state/characters-index';
import { CharactersEffects } from './state/effects/characters.effects';
import { SearchOptionsEffects } from './state/effects/search-options.effects';


@NgModule({
  declarations: [
    CharacterCardComponent,
    CharactersListShellComponent
  ],
  imports: [
    SharedModule,
    CharactersRoutingModule,
    StoreModule.forFeature(charactersFeatureState, charactersReducers),
    EffectsModule.forFeature([CharactersEffects, SearchOptionsEffects]),
    StarRatingModule.forChild(),
  ],
})
export class CharactersModule {}
