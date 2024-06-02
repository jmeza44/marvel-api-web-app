import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../shared/models/auth/user-profile.model';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersApiActions } from '../../state/actions/characters-api.actions';
import { CharactersState, charactersSelectors } from '../../state/characters-index';
import { searchOptionsActions } from '../../state/actions/search-options.actions';
import { ResourceRating } from '../../../shared/models/application/resource-rating.model';

@Component({
  templateUrl: './characters-list-shell.component.html',
  styleUrl: './characters-list-shell.component.scss'
})
export class CharactersListShellComponent {
  characters$!: Observable<{ character: Character, rating: ResourceRating | undefined; }[]>;
  totalCharacters$!: Observable<number>;
  countCharacters$!: Observable<number>;
  limitCharacters$!: Observable<number>;
  currentPage$!: Observable<number>;
  userProfile$!: Observable<UserProfile>;

  constructor(private charactersStore: Store<CharactersState>) {
    this.characters$ = this.charactersStore.pipe(select(charactersSelectors.getCharacters));
    this.totalCharacters$ = this.charactersStore.pipe(select(charactersSelectors.getTotalCharacters));
    this.countCharacters$ = this.charactersStore.pipe(select(charactersSelectors.getCountCharacters));
    this.limitCharacters$ = this.charactersStore.pipe(select(charactersSelectors.getLimitCharacters));
    this.currentPage$ = this.charactersStore.pipe(select(charactersSelectors.getCurrentPage));
  }

  ngOnInit() {
    this.charactersStore.dispatch(charactersApiActions.loadActions.load({ searchOptions: undefined }));
  }

  onPageChange($event: { currentPage: number, pageSize: number; }) {
    this.charactersStore.dispatch(searchOptionsActions.updateSearchOptions.updateOffsetPagination({ offset: (($event.currentPage - 1) * $event.pageSize) }));
  }
}
