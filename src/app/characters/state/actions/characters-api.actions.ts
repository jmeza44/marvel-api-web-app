import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';
import { Container } from '../../../shared/models/marvel-api/common/marvel-api-container.model';
import { SearchOptions } from '../../../shared/models/marvel-api/common/marvel-api-search-options.model';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';
import { ResourceRating } from '../../../shared/models/application/resource-rating.model';

const loadActions = createActionGroup({
  source: '[Characters API] Load',
  events: {
    'Load': props<{ searchOptions: SearchOptions | undefined; }>(),
    'Load Success': props<{ characters: Container<Character>; }>(),
    'Load Failure': props<{ httpErrorResponse: HttpErrorResponse; }>(),
  },
});

const loadRatingActions = createActionGroup({
  source: '[Characters API] Load Rating',
  events: {
    'Load': props<{ characterId: number; }>(),
    'Load Success': props<{ resourceRating: ResourceRating; }>(),
    'Load Failure': props<{ httpErrorResponse: HttpErrorResponse; }>(),
  }
});

export const charactersApiActions = {
  loadActions,
  loadRatingActions,
};
