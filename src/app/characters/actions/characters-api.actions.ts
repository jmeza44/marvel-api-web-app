import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Character } from '../../shared/models/marvel-api/core/marvel-api-character.model';
import { HttpErrorResponse } from '@angular/common/http';

export const charactersApiActions = createActionGroup({
  source: 'Characters API',
  events: {
    CharactersLoad: emptyProps(),
    CharactersLoadedSuccess: props<{ characters: Character[]; }>(),
    CharactersLoadedFailure: props<{ httpErrorResponse: HttpErrorResponse; }>(),
  },
});
