import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResourceRating } from '../../shared/models/application/resource-rating.model';
import { Container } from '../../shared/models/marvel-api/common/marvel-api-container.model';
import { SearchOptions } from '../../shared/models/marvel-api/common/marvel-api-search-options.model';
import { Character } from '../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersLoadReducer } from './reducers/characters-api.reducer';
import { searchOptionsReducer } from './reducers/search-options.reducer';

export const charactersFeatureState = 'charactersState';

export interface CharactersState {
  characters: { charactersContainer: Container<Character>, charactersRating: ResourceRating[]; };
  searchOptions: SearchOptions;
}

export const charactersReducers = {
  characters: charactersLoadReducer,
  searchOptions: searchOptionsReducer,
};

const getCharactersState = createFeatureSelector<CharactersState>(charactersFeatureState);

const getCharacters = createSelector(
  getCharactersState,
  (state) => state.characters.charactersContainer.results.map((character) => ({
    character,
    rating: state.characters.charactersRating.find(({ resourceId }) => parseInt(resourceId) === character.id)
  })),
);

const getTotalCharacters = createSelector(
  getCharactersState,
  (state) => state.characters.charactersContainer.total,
);

const getCountCharacters = createSelector(
  getCharactersState,
  (state) => state.characters.charactersContainer.count,
);

const getLimitCharacters = createSelector(
  getCharactersState,
  (state) => state.characters.charactersContainer.limit,
);

const getCurrentPage = createSelector(
  getCharactersState,
  (state) => state.characters.charactersContainer.offset / ((state.searchOptions.limit ?? 1) === 0 ? 1 : (state.searchOptions.limit ?? 1)),
);

const getSearchOptions = createSelector(
  getCharactersState,
  (state) => state.searchOptions,
);

export const charactersSelectors = {
  getCharactersState,
  getCharacters,
  getTotalCharacters,
  getCountCharacters,
  getLimitCharacters,
  getCurrentPage,
  getSearchOptions,
};
