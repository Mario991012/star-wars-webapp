import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilmCardComponent } from './film-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Necessary for Material components

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  const mockFilm = {
    title: 'A New Hope',
    director: 'George Lucas',
    releaseDate: new Date('1977-05-25'),
    episodeID: 4,
    producers: ['Gary Kurtz', 'Rick McCallum']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FilmCardComponent,
        NoopAnimationsModule,
        MatCardModule, 
        MatChip, 
        MatChipSet
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    component.film = mockFilm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display film title', () => {
    const titleElement = fixture.debugElement.query(By.css('mat-card-title h3')).nativeElement;
    expect(titleElement.textContent).toContain(mockFilm.title);
  });

  it('should display film director', () => {
    const directorElement = fixture.debugElement.query(By.css('mat-card-content p:first-child')).nativeElement;
    expect(directorElement.textContent).toContain(`Director: ${mockFilm.director}`);
  });

  it('should display film release date in correct format', () => {
    const releaseDateElement = fixture.debugElement.query(By.css('mat-card-content p:nth-child(2)')).nativeElement;
    expect(releaseDateElement.textContent).toContain('05/1977');
  });

  it('should display film episode', () => {
    const episodeElement = fixture.debugElement.query(By.css('mat-card-content p:nth-child(3)')).nativeElement;
    expect(episodeElement.textContent).toContain(`Episode: ${mockFilm.episodeID}`);
  });

  it('should display film producers', () => {
    const chipElements = fixture.debugElement.queryAll(By.css('mat-chip'));
    expect(chipElements.length).toBe(mockFilm.producers.length);
    chipElements.forEach((chip, index) => {
      expect(chip.nativeElement.textContent).toContain(mockFilm.producers[index]);
    });
  });
});
