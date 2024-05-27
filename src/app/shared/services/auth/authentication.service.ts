import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthResponse } from '../../models/auth/auth-response.model';
import { SignInUser } from '../../models/auth/sign-in-user.model';
import { SignUpUser } from '../../models/auth/sign-up-user.model';
import { UserProfile } from '../../models/auth/user-profile.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private marvelApiBaseUrl = environment.marvelApiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  signIn(credentials: SignInUser): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.marvelApiBaseUrl}/auth/sign-in`,
      credentials,
    );
  }

  signUp(credentials: SignUpUser): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.marvelApiBaseUrl}/auth/sign-up`,
      credentials,
    );
  }

  loadProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(
      `${this.marvelApiBaseUrl}/auth/profile`,
    );
  }
}
