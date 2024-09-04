import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from '../../components/cards/film-card/film-card.component';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { FilmService } from '../../../data/graphql/services/film.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FilmDetailsDialogComponent } from '../../components/dialogs/film-details-dialog/film-details-dialog.component';
import { IFilm } from '../../../data/graphql/interfaces/film.interface';
import { ICharacter } from '../../../data/graphql/interfaces/character.interface';
import { Planet } from '../../../data/graphql/interfaces/planet.interface';
import { IFilterForm } from '../../interfaces/filter-form.interface';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';

/**
 * `FilmListComponent` is responsible for displaying a list of films with filtering options.
 * It fetches metadata for all films from the GraphQL API and allows the user to filter the list by
 * director, producers, and title. The component also provides the ability to open a dialog with detailed
 * information about a selected film.
 *
 * @decorator `@Component`
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FilmCardComponent,
    MatDialogModule,
    FilterFormComponent,
  ],
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmListComponent implements OnInit, OnDestroy {
  /**
   * An observable that emits the list of films fetched from the GraphQL API.
   */
  films$!: Observable<IFilm[]>;

  /**
   * An observable that emits the filtered list of films based on user input.
   */
  filteredFilms$!: Observable<IFilm[]>;

  /**
   * An observable that emits error messages in case of failures in fetching film data.
   */
  error$!: Observable<string>;

  /**
   * Subject used to manage the unsubscription of observables when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Injects the `FilmService` to fetch film data and `MatDialog` to handle dialogs.
   */
  private filmService = inject(FilmService);
  readonly dialog = inject(MatDialog);

  /**
   * Defines the filter fields available in the filtering form.
   */
  filterFields: IFilterForm[] = [
    { label: 'Director', formControlName: 'director' },
    { label: 'Producers', formControlName: 'producers' },
    { label: 'Title', formControlName: 'title' },
  ];

  /**
   * It triggers the fetching of film metadata.
   */
  ngOnInit(): void {
    this.getFilmsMetadata();
  }

  /**
   * It completes the `destroy$` subject to clean up observables.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Opens a dialog displaying detailed information about the selected film.
   *
   * @param film - The selected `IFilm` object for which the details will be shown in a dialog.
   */
  public openDataDialog(film: IFilm): void {
    this.dialog.open(FilmDetailsDialogComponent, {
      data: {
        title: film?.title,
        content: film?.openingCrawl,
        characters: film?.characterConnection?.characters?.map(
          (character: ICharacter) => character?.name
        ),
        planets: film?.planetConnection?.planets?.map(
          (planet: Planet) => planet?.name
        ),
      },
    });
  }

  /**
   * Fetches metadata for all films from the GraphQL API using the `FilmService`.
   * It also handles potential errors and initializes the filtered films observable.
   */
  private getFilmsMetadata(): void {
    this.error$ = of(''); // Initialize the error observable
  
    this.films$ = this.filmService.getAllFilmsMetadata().pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching film list:', error);
        this.error$ = of('Something were wrong while getting the films. Reload the page and try again.');
        return of([]);
      })
    );
  
    this.filteredFilms$ = this.films$;
  }
  
  /**
   * Handles changes in the filter form and updates the filtered films list based on the provided filters.
   *
   * @param filters - The object containing the filter values from the filter form.
   */
  onFilterChanged(filters: any): void {
    this.filteredFilms$ = this.films$.pipe(
      map((films) =>
        films.filter(
          (film) =>
            (!filters.director || film.director
                ?.toLocaleLowerCase()
                .includes(filters.director.toLocaleLowerCase())) &&
            (!filters.producers || film.producers
                .join(' ')
                .toLocaleLowerCase()
                .includes(filters.producers.toLocaleLowerCase())) &&
            (!filters.title || film.title
                ?.toLocaleLowerCase()
                .includes(filters.title.toLocaleLowerCase()))
        )
      )
    );
  }
}
