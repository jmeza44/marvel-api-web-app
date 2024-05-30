import { createReducer, on } from '@ngrx/store';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersApiActions } from '../actions/characters-api.actions';

const initialState: Character[] = [];

export const charactersLoadReducer = createReducer(
  initialState,
  on(charactersApiActions.charactersLoad, () => []),
  on(charactersApiActions.charactersLoadedSuccess, (_state, { characters }) => characters),
  on(charactersApiActions.charactersLoadedFailure, (state) => state),
);

