import { createAction, props } from '@ngrx/store';

export const filterByNameStartsWith = createAction(
  '[Search Options] Filter By Name Starts With',
  props<{ nameStartsWith: string; }>
);

export const offsetPagination = createAction(
  '[Search Options] Offset Pagination',
  props<{ offset: number; }>
);

export const limitPagination = createAction(
  '[Search Options] Limit Pagination',
  props<{ limit: number; }>
);
