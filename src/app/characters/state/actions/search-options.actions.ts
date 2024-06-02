import { createActionGroup, props } from '@ngrx/store';

export const updateSearchOptions = createActionGroup({
  source: '[Search Options] Update',
  events: {
    'Update Filter by Name': props<{ name: string; }>(),
    'Update Offset Pagination': props<{ offset: number; }>(),
    'Update Limit Pagination': props<{ limit: number; }>(),
  },
});

export const searchOptionsActions = {
  updateSearchOptions,
};
