import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmListComponent } from './film-list.component';
import { FilmCardComponent } from '../../components/cards/film-card/film-card.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FilmService } from '../../../data/graphql/services/film.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({ selector: 'app-mock-film-service', template: '' })
class MockFilmService {
  getAllFilmsMetadata() {
    return of(mockFilms);
  }
}

const mockFilms = [
  {
    title: 'Film 1',
    openingCrawl: 'Opening crawl 1',
    characterConnection: {
      characters: [{ name: 'Character 1' }, { name: 'Character 2' }],
    },
    planetConnection: { planets: [{ name: 'Planet 1' }, { name: 'Planet 2' }] },
    director: 'Director 1',
    producers: ['Producer 1'],
  },
  {
    title: 'Film 2',
    openingCrawl: 'Opening crawl 2',
    characterConnection: { characters: [{ name: 'Character 3' }] },
    planetConnection: { planets: [{ name: 'Planet 3' }] },
    director: 'Director 2',
    producers: ['Producer 2'],
  },
];

describe('FilmListComponent', () => {
  let component: FilmListComponent;
  let fixture: ComponentFixture<FilmListComponent>;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        FilmCardComponent,
        FilmListComponent,
        FilterFormComponent,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: FilmService, useClass: MockFilmService },
        MatDialog,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmListComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display list of films', () => {
    const filmCards = fixture.debugElement.queryAll(By.css('app-film-card'));
    expect(filmCards.length).toBe(2); // Ensure both mock films are displayed
  });

  it('should filter films based on the filter criteria', () => {
    fixture.detectChanges();

    const filters = {
      title: 'Film 2',
      director: 'Director 2',
      producers: 'Producer 2',
    };
    component.onFilterChanged(filters);

    component.filteredFilms$.subscribe((filteredFilms) => {
      expect(filteredFilms.length).toBe(1);
      expect(filteredFilms[0].title).toBe('Film 2');
    });
  });
});
