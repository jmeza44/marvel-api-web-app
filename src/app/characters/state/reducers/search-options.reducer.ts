import { createReducer, on } from '@ngrx/store';
import { SearchOptions } from '../../../shared/models/marvel-api/common/marvel-api-search-options.model';

const initialState: SearchOptions = {
  limit: 10,
  offset: 0,
};

export const searchOptionsReducer = createReducer(
  initialState,
);

