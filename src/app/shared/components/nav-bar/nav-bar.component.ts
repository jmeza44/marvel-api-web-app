import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState, authSelectors } from '../../../auth/state/auth-index';
import { UserProfile } from '../../models/auth/user-profile.model';

@Component({
  selector: 'marvel-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  userProfile$: Observable<UserProfile>;
  isUserAuthenticated$: Observable<boolean>;

  constructor(private authStore: Store<AuthState>) {
    this.userProfile$ = this.authStore.pipe(select(authSelectors.getUserProfile));
    this.isUserAuthenticated$ = this.authStore.pipe(select(authSelectors.getIsAuthenticated));
  }
}
