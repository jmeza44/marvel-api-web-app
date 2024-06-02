import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { NotifierService } from '../../../shared/services/core/notifier.service';
import { searchOptionsActions } from '../actions/search-options.actions';
import { CharactersService } from '../../../shared/services/marvel-api/characters.service';
import { charactersApiActions } from '../actions/characters-api.actions';
import { Store, select } from '@ngrx/store';
import { CharactersState, charactersSelectors } from '../characters-index';

@Injectable()
export class SearchOptionsEffects {
  constructor(
    private actions$: Actions,
    private charactersService: CharactersService,
    private charactersStore: Store<CharactersState>,
  ) {}

  updateFilterByName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchOptionsActions.updateSearchOptions.updateFilterByName),
      withLatestFrom(this.charactersStore.pipe(select(charactersSelectors.getSearchOptions))),
      switchMap(([{ name }, searchOptions]) => {
        return this.charactersService.getCharacters({ ...searchOptions, nameStartsWith: name }).pipe(
          map((characters) =>
            charactersApiActions.loadActions.loadSuccess({
              characters: characters.data ?? {
                count: 0,
                limit: 0,
                offset: 0,
                results: [],
                total: 0
              },
            }),
          ),
          catchError((httpErrorResponse: HttpErrorResponse) => of(charactersApiActions.loadActions.loadFailure({ httpErrorResponse }))),
        );
      }
      ),
    ),
  );


  updateOffsetPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchOptionsActions.updateSearchOptions.updateOffsetPagination),
      withLatestFrom(this.charactersStore.pipe(select(charactersSelectors.getSearchOptions))),
      switchMap(([{ offset }, searchOptions]) => {
        return this.charactersService.getCharacters({ ...searchOptions, offset }).pipe(
          map((characters) =>
            charactersApiActions.loadActions.loadSuccess({
              characters: characters.data ?? {
                count: 0,
                limit: 0,
                offset: 0,
                results: [],
                total: 0
              },
            }),
          ),
          catchError((httpErrorResponse: HttpErrorResponse) => of(charactersApiActions.loadActions.loadFailure({ httpErrorResponse }))),
        );
      }
      ),
    ),
  );

  updateLimitPagination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchOptionsActions.updateSearchOptions.updateLimitPagination),
      withLatestFrom(this.charactersStore.pipe(select(charactersSelectors.getSearchOptions))),
      switchMap(([{ limit }, searchOptions]) => {
        return this.charactersService.getCharacters({ ...searchOptions, limit }).pipe(
          map((characters) =>
            charactersApiActions.loadActions.loadSuccess({
              characters: characters.data ?? {
                count: 0,
                limit: 0,
                offset: 0,
                results: [],
                total: 0
              },
            }),
          ),
          catchError((httpErrorResponse: HttpErrorResponse) => of(charactersApiActions.loadActions.loadFailure({ httpErrorResponse }))),
        );
      }
      ),
    ),
  );
}
