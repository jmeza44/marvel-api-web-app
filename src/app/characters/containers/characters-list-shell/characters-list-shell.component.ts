import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../../../shared/models/marvel-api/core/marvel-api-character.model';
import { charactersApiActions } from '../../state/actions/characters-api.actions';
import { CharactersState, charactersSelectors } from '../../state/characters-index';
import { UserProfile } from '../../../shared/models/auth/user-profile.model';

@Component({
  templateUrl: './characters-list-shell.component.html',
  styleUrl: './characters-list-shell.component.scss'
})
export class CharactersListShellComponent {
  characters$!: Observable<Character[]>;
  userProfile$!: Observable<UserProfile>;

  constructor(private charactersStore: Store<CharactersState>) {
    this.characters$ = this.charactersStore.pipe(select(charactersSelectors.getCharacters));
  }

  ngOnInit() {
    this.charactersStore.dispatch(charactersApiActions.charactersLoad());
  }
}
