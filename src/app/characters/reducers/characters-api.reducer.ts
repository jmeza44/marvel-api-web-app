import { createFeature, createReducer, on } from '@ngrx/store';
import { Character } from '../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersApiActions } from '../actions/characters-api.actions';

interface State {
  characters: Character[];
  loading: boolean;
}

const initialState: State = {
  characters: [],
  loading: false,
};

export const booksFeature = createFeature({
  name: 'characters',
  reducer: createReducer(
    initialState,
    on(
      charactersApiActions.charactersLoadedSuccess,
      (state, { characters }) => ({
        ...state,
        characters,
        loading: false,
      }),
    ),
  ),
});

export const {
  name,
  reducer,
  selectCharacters,
  selectCharactersState,
  selectLoading,
} = booksFeature;
