import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../base/apollo-client.service';
import {
  GET_ALL_FILMS_METADATA,
  GET_FILMS_BY_TITLE,
} from '../mutations/films.mutations';
import { AllFilmsData, IFilm } from '../interfaces/film.interface';

/**
 * `FilmService` is responsible for interacting with the GraphQL API to fetch film-related data.
 * It provides methods to retrieve films based on a title or retrieve all film metadata.
 *
 * @remarks
 * This service uses `ApolloClientService` to execute GraphQL queries and returns the results as `Observable` streams.
 *
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root',
})
export class FilmService {
  constructor(private apolloClientService: ApolloClientService) {}

  /**
   * Fetches films from the GraphQL API based on a film title.
   * Executes the `GET_FILMS_BY_TITLE` query with the given title as a variable.
   *
   * @param title - The title of the film used to filter the results.
   * @returns An `Observable<AllFilmsData>` that emits the list of films matching the given title.
   */
  public getFilmsByTitle(title: string): Observable<AllFilmsData> {
    return new Observable<AllFilmsData>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_FILMS_BY_TITLE,
          variables: { title },
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

  /**
   * Fetches metadata for all films from the GraphQL API.
   * Executes the `GET_ALL_FILMS_METADATA` query to retrieve metadata for all films.
   *
   * @returns An `Observable<IFilm[]>` that emits the list of all films' metadata.
   *
   */
  public getAllFilmsMetadata(): Observable<IFilm[]> {
    return new Observable<IFilm[]>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_ALL_FILMS_METADATA,
        })
        .then((result: AllFilmsData) => {
          observer.next(result?.data?.allFilms?.films);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
