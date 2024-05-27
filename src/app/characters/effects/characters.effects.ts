import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, tap } from 'rxjs';
import { NotifierService } from '../../shared/services/core/notifier.service';
import { CharactersService } from '../../shared/services/marvel-api/characters.service';
import { charactersApiActions } from '../actions/characters-api.actions';



@Injectable()
export class CharactersEffects {
  constructor(
    private actions$: Actions,
    private notifier: NotifierService,
    private charactersService: CharactersService,
  ) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.charactersLoad),
      exhaustMap(() =>
        this.charactersService.getCharacters().pipe(
          map((characters) =>
            charactersApiActions.charactersLoadedSuccess({
              characters: characters.data?.results ?? [],
            }),
          ),
          catchError((httpErrorResponse: HttpErrorResponse) => of(charactersApiActions.charactersLoadedFailure({ httpErrorResponse }))),
        ),
      ),
    ),
  );

  loadCharactersFailure = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.charactersLoadedFailure),
      tap(() => this.notifier.loadDataError('Characters')),
    ),
    { dispatch: false },
  );
}
