import { createReducer, on } from '@ngrx/store';
import { Container } from '../../../shared/models/marvel-api/common/marvel-api-container.model';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersApiActions } from '../actions/characters-api.actions';
import { ResourceRating } from '../../../shared/models/application/resource-rating.model';

const initialState: { charactersContainer: Container<Character>, charactersRating: ResourceRating[]; } = {
  charactersContainer: {
    count: 0,
    limit: 0,
    offset: 0,
    results: [],
    total: 0
  },
  charactersRating: []
};

export const charactersLoadReducer = createReducer(
  initialState,
  on(charactersApiActions.loadActions.load, () => ({
    charactersContainer: {
      count: 0,
      limit: 0,
      offset: 0,
      results: [],
      total: 0
    },
    charactersRating: []
  })),
  on(charactersApiActions.loadActions.loadSuccess, (state, { characters }) => ({ ...state, charactersContainer: characters })),
  on(charactersApiActions.loadActions.loadFailure, (state) => state),
  on(charactersApiActions.loadRatingActions.load, (state) => state),
  on(charactersApiActions.loadRatingActions.loadSuccess, (state, { resourceRating }) => ({ ...state, charactersRating: [...state.charactersRating, resourceRating] })),
  on(charactersApiActions.loadRatingActions.loadFailure, (state) => state)
);

