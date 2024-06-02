import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private accessTokenKey: string = "access_token";

  constructor() {}

  addAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, JSON.stringify(accessToken));
  }

  getAccessToken(): any {
    const item = localStorage.getItem(this.accessTokenKey);
    return item ? JSON.parse(item) : null;
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }

  addItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clean(): void {
    localStorage.clear();
  }
}
