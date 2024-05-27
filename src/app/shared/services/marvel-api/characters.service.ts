import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wrapper } from '../../models/marvel-api/common/marvel-api-wrapper.model';
import { Character } from '../../models/marvel-api/core/marvel-api-character.model';
import { SearchOptions } from '../../models/marvel-api/common/marvel-api-search-options.model';

@Injectable({ providedIn: 'root' })
export class CharactersService {
  constructor(private httpClient: HttpClient) {}

  getCharacters(searchOptions?: SearchOptions): Observable<Wrapper<Character>> {
    const params = new HttpParams({ fromObject: { ...searchOptions } });
    return this.httpClient.get<Wrapper<Character>>(
      'http://localhost:3000/characters',
      {
        params,
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiamFpbWVhbGJlcnRvbWV6YUBob3RtYWlsLmNvbSIsInVzZXJuYW1lIjoiam1lemE0NCIsImZpc3ROYW1lIjoiSmFpbWUiLCJsYXN0TmFtZSI6Ik1lemEifSwiaWF0IjoxNzE2NzA0NDM0LCJleHAiOjE3MTY3MDgwMzQsImF1ZCI6Im1hcnZlbC1hcGkifQ.Ds5mR3b2v-KBJW_oZZSFEt29fko1JS-dq30SxOkHu1w',
        },
      },
    );
  }
}
