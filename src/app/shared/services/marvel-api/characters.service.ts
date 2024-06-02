import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResourceRating } from '../../models/application/resource-rating.model';
import { SearchOptions } from '../../models/marvel-api/common/marvel-api-search-options.model';
import { Wrapper } from '../../models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from '../../models/marvel-api/core/marvel-api-character.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  private marvelApiBaseUrl = environment.marvelApiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  getCharacters(searchOptions?: SearchOptions): Observable<Wrapper<Character>> {
    const nonUndefinedSearchOptions = Object.entries(searchOptions ?? {})
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    const params = new HttpParams({ fromObject: nonUndefinedSearchOptions });
    return this.httpClient.get<Wrapper<Character>>(
      `${this.marvelApiBaseUrl}/characters`, { params }
    );
  }

  getCharacterRating(characterId: number): Observable<ResourceRating> {
    return this.httpClient.get<ResourceRating>(
      `${this.marvelApiBaseUrl}/characters/${characterId}/rating`
    );
  }
}
