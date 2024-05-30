import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, props } from '@ngrx/store';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';
import { SearchOptions } from '../../../shared/models/marvel-api/common/marvel-api-search-options.model';

export const charactersApiActions = createActionGroup({
  source: 'Characters API',
  events: {
    CharactersLoad: props<{ searchOptions: SearchOptions; }>,
    CharactersLoadedSuccess: props<{ characters: Character[]; }>(),
    CharactersLoadedFailure: props<{ httpErrorResponse: HttpErrorResponse; }>(),
  },
});
