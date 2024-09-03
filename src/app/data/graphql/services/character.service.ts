import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../base/apollo-client.service';
import { GET_ALL_FILMS_METADATA } from '../mutations/films.mutations';
import { AllCharactersData, ICharacter } from '../interfaces/character.interface';
import { GET_ALL_CHARACTERS_METADATA } from '../mutations/character.mutations';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  constructor(private apolloClientService: ApolloClientService) {}

  public getFilmsByTitle(title: string): Observable<AllCharactersData> {
    return new Observable<AllCharactersData>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_ALL_CHARACTERS_METADATA,
        })
        .then((result) => {
          observer.next(result?.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public getAllCharactersMetadata(): Observable<ICharacter[]> {
    return new Observable<ICharacter[]>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_ALL_CHARACTERS_METADATA,
        })
        .then((result: AllCharactersData) => {
          observer.next(result?.data?.allPeople?.people);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
