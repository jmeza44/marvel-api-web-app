import { createReducer, on } from '@ngrx/store';
import { SearchOptions } from '../../../shared/models/marvel-api/common/marvel-api-search-options.model';
import { searchOptionsActions } from '../actions/search-options.actions';

const initialState: SearchOptions = {
  nameStartsWith: undefined,
  limit: 20,
  offset: 0,
};

export const searchOptionsReducer = createReducer(
  initialState,
  on(searchOptionsActions.updateSearchOptions.updateFilterByName, (state, { name }) => ({ ...state, nameStartsWith: name })),
  on(searchOptionsActions.updateSearchOptions.updateLimitPagination, (state, { limit }) => ({ ...state, limit })),
  on(searchOptionsActions.updateSearchOptions.updateOffsetPagination, (state, { offset }) => ({ ...state, offset })),
);

