import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from '../../components/cards/film-card/film-card.component';
import { Observable, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { FilmService } from '../../../data/graphql/services/film.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FilmDetailsDialogComponent } from '../../components/dialogs/film-details-dialog/film-details-dialog.component';
import { Film } from '../../../data/graphql/interfaces/film.interface';
import { ICharacter } from '../../../data/graphql/interfaces/character.interface';
import { Planet } from '../../../data/graphql/interfaces/planet.interface';
import { IFilterForm } from '../../interfaces/filter-form.interface';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';

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
  films$!: Observable<Film[]>;
  filteredFilms$!: Observable<Film[]>;
  error$!: Observable<string>;
  private destroy$ = new Subject<void>();
  private filmService = inject(FilmService);
  readonly dialog = inject(MatDialog);

  filterFields: IFilterForm[] = [
    { label: 'Director', formControlName: 'director' },
    { label: 'Producers', formControlName: 'producers' },
    { label: 'Title', formControlName: 'title' },
  ];

  ngOnInit(): void {
    this.getFilmsMetadata();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDataDialog(film: Film): void {
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

  private getFilmsMetadata(): void {
    this.films$ = this.filmService.getAllFilmsMetadata().pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching film list:', error);
        return [];
      })
    );

    this.filteredFilms$ = this.films$;

    this.error$ = this.films$.pipe(
      map((films) => (films.length ? '' : 'No films found'))
    );
  }

  onFilterChanged(filters: any): void {
    this.filteredFilms$ = this.films$.pipe(
      map((films) =>
        films.filter(
          (film) =>
            (!filters.director ||
              film.director
                ?.toLocaleLowerCase()
                .includes(filters.director.toLocaleLowerCase())) &&
            (!filters.producers ||
              film.producers
                .join(' ')
                .toLocaleLowerCase()
                .includes(filters.producers.toLocaleLowerCase())) &&
            (!filters.title ||
              film.title
                ?.toLocaleLowerCase()
                .includes(filters.title.toLocaleLowerCase()))
        )
      )
    );
  }
}
