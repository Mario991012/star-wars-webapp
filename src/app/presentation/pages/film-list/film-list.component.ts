import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmCardComponent } from '../../components/film-card/film-card.component';
import { Observable, Subject } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { FilmService } from '../../../data/graphql/services/film.service';

@Component({
  standalone: true,
  imports: [CommonModule, FilmCardComponent],
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmListComponent implements OnInit, OnDestroy {
  films$!: Observable<any[]>;
  error$!: Observable<string>;
  private destroy$ = new Subject<void>();
  private filmService = inject(FilmService);

  ngOnInit(): void {
    this.films$ = this.filmService.getAllFilmsMetadata().pipe(
      takeUntil(this.destroy$),
      map(result => result?.data?.allFilms?.films || []),
      catchError(error => {
        console.error('Error fetching film list:', error);
        return [error.message || 'An error occurred while fetching the film list.'];
      })
    );

    this.error$ = this.films$.pipe(
      map(films => Array.isArray(films) ? '' : films)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
