import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../../../core/services/apollo-client.service';
import {
  AllCharactersData,
  ICharacter,
} from '../interfaces/character.interface';
import { GET_ALL_CHARACTERS_METADATA } from '../mutations/character.mutations';

/**
 * `CharacterService` is responsible for interacting with the GraphQL API to fetch character-related data.
 * It provides methods to retrieve characters based on different criteria by executing GraphQL queries.
 *
 * @remarks
 * This service relies on `ApolloClientService` to execute the queries and returns the results as `Observable` streams.
 * 
 * It offers methods to:
 * - Fetch all characters metadata.
 * - Fetch characters based on film title.
 * 
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {

  constructor(private apolloClientService: ApolloClientService) {}

  /**
   * Fetches characters from the GraphQL API based on a film title.
   * Executes the `GET_ALL_CHARACTERS_METADATA` query with the given title as a variable.
   * 
   * @param title - The title of the film used to filter characters.
   * @returns An `Observable<AllCharactersData>` that emits the list of characters matching the film title.
   * 
   */
  public getFilmsByTitle(title: string): Observable<AllCharactersData> {
    return new Observable<AllCharactersData>((observer) => {
      this.apolloClientService
        .executeQuery(GET_ALL_CHARACTERS_METADATA, { title })
        .then((result) => {
          observer.next(result?.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /**
   * Fetches metadata for all characters from the GraphQL API.
   * Executes the `GET_ALL_CHARACTERS_METADATA` query to retrieve character data.
   * 
   * @returns An `Observable<ICharacter[]>` that emits the list of all characters' metadata.
   * 
   */
  public getAllCharactersMetadata(): Observable<ICharacter[]> {
    return new Observable<ICharacter[]>((observer) => {
      this.apolloClientService
        .executeQuery(GET_ALL_CHARACTERS_METADATA)
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
