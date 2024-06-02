import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, tap, switchMap, withLatestFrom, mergeMap } from 'rxjs';
import { NotifierService } from '../../../shared/services/core/notifier.service';
import { CharactersService } from '../../../shared/services/marvel-api/characters.service';
import { charactersApiActions } from '../actions/characters-api.actions';
import { Store, select } from '@ngrx/store';
import { CharactersState, charactersSelectors } from '../characters-index';

@Injectable()
export class CharactersEffects {
  constructor(
    private actions$: Actions,
    private notifier: NotifierService,
    private charactersService: CharactersService,
    private charactersStore: Store<CharactersState>,
  ) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.loadActions.load),
      withLatestFrom(this.charactersStore.pipe(select(charactersSelectors.getSearchOptions))),
      switchMap(([{ searchOptions }, searchOptionsOnState]) =>
        this.charactersService.getCharacters({ ...searchOptionsOnState, ...searchOptions }).pipe(
          map((characters) =>
            charactersApiActions.loadActions.loadSuccess({
              characters: characters.data ?? {
                count: 0,
                limit: searchOptions?.limit ?? 0,
                offset: searchOptions?.offset ?? 0,
                results: [],
                total: 0
              },
            }),
          ),
          catchError(({ httpErrorResponse }) => of(charactersApiActions.loadActions.loadFailure({ httpErrorResponse }))),
        ),
      ),
    ),
  );

  loadCharactersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.loadActions.loadSuccess),
      switchMap(({ characters }) =>
        characters.results.filter(({ id }) => id !== undefined)
          .map(({ id }) => charactersApiActions.loadRatingActions.load({ characterId: id ?? 0 }))
      ),
    ));

  loadCharactersFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.loadActions.loadFailure),
      tap(() => this.notifier.loadDataError('Characters')),
    ),
    { dispatch: false },
  );

  loadRating$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.loadRatingActions.load),
      mergeMap(({ characterId }) =>
        this.charactersService.getCharacterRating(characterId).pipe(
          map((resourceRating) => charactersApiActions.loadRatingActions.loadSuccess({ resourceRating }))
        )
      ),
      catchError(({ httpErrorResponse }) => of(charactersApiActions.loadActions.loadFailure({ httpErrorResponse }))),
    ));

  loadRatingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(charactersApiActions.loadActions.loadFailure),
      tap(() => this.notifier.loadDataError('Characters')),
    ),
    { dispatch: false },
  );
}
