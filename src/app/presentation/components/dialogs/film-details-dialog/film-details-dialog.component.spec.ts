import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FilmDetailsDialogComponent } from './film-details-dialog.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({ selector: 'app-mock-dialog-ref', template: '' })
class MockMatDialogRef {
  close() {}
}

describe('FilmDetailsDialogComponent', () => {
  let component: FilmDetailsDialogComponent;
  let fixture: ComponentFixture<FilmDetailsDialogComponent>;
  const mockData = {
    title: 'Test Title',
    content: 'Test content',
    characters: ['Character 1', 'Character 2'],
    planets: ['Planet 1', 'Planet 2']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        FilmDetailsDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain(mockData.title);
  });

  it('should display the content', () => {
    const contentElement = fixture.debugElement.query(By.css('mat-dialog-content p'));
    expect(contentElement.nativeElement.textContent).toContain(mockData.content);
  });

  it('should display characters list if characters are provided', () => {
    const charactersList = fixture.debugElement.queryAll(By.css('ul:nth-of-type(1) li'));
    expect(charactersList.length).toBe(mockData.characters.length);
    mockData.characters.forEach((character, index) => {
      expect(charactersList[index].nativeElement.textContent).toContain(character);
    });
  });

  it('should display planets list if planets are provided', () => {
    const planetsList = fixture.debugElement.queryAll(By.css('ul:nth-of-type(2) li'));
    expect(planetsList.length).toBe(mockData.planets.length);
    mockData.planets.forEach((planet, index) => {
      expect(planetsList[index].nativeElement.textContent).toContain(planet);
    });
  });

  it('should call dialogRef.close() when Ok button is clicked', () => {
    spyOn(component.dialogRef, 'close');
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
