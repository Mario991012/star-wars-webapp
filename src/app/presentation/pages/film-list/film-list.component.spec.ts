import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmListComponent } from './film-list.component';
import { FilmCardComponent } from '../../components/film-card/film-card.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { FilmService } from '../../../data/graphql/services/film.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({ selector: 'app-mock-film-service', template: '' })
class MockFilmService {
  getAllFilmsMetadata() {
    return of({ data: { allFilms: { films: mockFilms } } });
  }
}

const mockFilms = [
  {
    title: 'Film 1',
    openingCrawl: 'Opening crawl 1',
    characterConnection: { characters: [{ name: 'Character 1' }, { name: 'Character 2' }] },
    planetConnection: { planets: [{ name: 'Planet 1' }, { name: 'Planet 2' }] }
  },
  {
    title: 'Film 2',
    openingCrawl: 'Opening crawl 2',
    characterConnection: { characters: [{ name: 'Character 3' }] },
    planetConnection: { planets: [{ name: 'Planet 3' }] }
  }
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
        FilmCardComponent,
        FilmListComponent
      ],
      providers: [
        { provide: FilmService, useClass: MockFilmService },
        MatDialog
      ]
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
    expect(filmCards.length).toBe(mockFilms.length);
  });
});
