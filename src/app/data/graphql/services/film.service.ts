import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../base/apollo-client.service';
import { GET_ALL_FILMS_METADATA, GET_FILMS_BY_TITLE } from '../mutations/films.mutations';

@Injectable({
  providedIn: 'root',
})
export class FilmService {

  constructor(private apolloClientService: ApolloClientService) {}

  public getFilmsByTitle(title: string): Observable<any> {
    return new Observable((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_FILMS_BY_TITLE,
          variables: {
            title
          }
        })
        .then((result) => {
          observer.next(result.data.allFilms.films);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  public getAllFilmsMetadata(): Observable<any> {
    return new Observable((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_ALL_FILMS_METADATA,
        })
        .then((result) => {
          observer.next(result);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
