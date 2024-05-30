import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Character } from '../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersLoadReducer } from './reducers/characters-api.reducer';
import { SearchOptions } from '../../shared/models/marvel-api/common/marvel-api-search-options.model';
import { searchOptionsReducer } from './reducers/search-options.reducer';

export const charactersFeatureState = 'charactersState';

export interface CharactersState {
  characters: Character[];
  searchOptions: SearchOptions;
}

export const charactersReducers = {
  characters: charactersLoadReducer,
  searchOptions: searchOptionsReducer,
};

const getCharactersState = createFeatureSelector<CharactersState>(charactersFeatureState);

const getCharacters = createSelector(
  getCharactersState,
  (state) => state.characters,
);

export const charactersSelectors = {
  getCharactersState,
  getCharacters,
};
