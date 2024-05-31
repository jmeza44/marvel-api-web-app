import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SearchOptions } from '../../models/marvel-api/common/marvel-api-search-options.model';
import { Wrapper } from '../../models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from '../../models/marvel-api/core/marvel-api-character.model';


@Injectable({ providedIn: 'root' })
export class CharactersService {
  private marvelApiBaseUrl = environment.marvelApiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  getCharacters(searchOptions?: SearchOptions): Observable<Wrapper<Character>> {
    const params = new HttpParams({ fromObject: { ...searchOptions } });
    return this.httpClient.get<Wrapper<Character>>(
      `${this.marvelApiBaseUrl}/characters`, { params }
    );
  }
}
