import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../base/apollo-client.service';
import { GET_ALL_FILMS_METADATA, GET_FILMS_BY_TITLE } from '../mutations/films.mutations';
import { AllFilmsData, IFilm } from '../interfaces/film.interface';

@Injectable({
  providedIn: 'root',
})
export class FilmService {

  constructor(private apolloClientService: ApolloClientService) {}

  public getFilmsByTitle(title: string): Observable<AllFilmsData> {
    return new Observable<AllFilmsData>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_FILMS_BY_TITLE,
          variables: {
            title
          }
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
