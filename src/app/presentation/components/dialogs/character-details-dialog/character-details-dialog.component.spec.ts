import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailsDialogComponent } from './character-details-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ICharacter,
  Starship,
} from '../../../../data/graphql/interfaces/character.interface';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

describe('CharacterDetailsDialogComponent', () => {
  let component: CharacterDetailsDialogComponent;
  let fixture: ComponentFixture<CharacterDetailsDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<
    MatDialogRef<CharacterDetailsDialogComponent>
  >;

  const mockCharacter: ICharacter = {
    name: 'Luke Skywalker',
    birthYear: '19BBY',
    eyeColor: 'blue',
    gender: 'male',
    hairColor: 'blond',
    height: 172,
    homeworld: { name: 'Tatooine' },
    skinColor: 'fair',
    starshipConnection: {
      starships: [
        { name: 'X-wing', passengers: '0', crew: '1', consumables: '10' },
        {
          name: 'Imperial shuttle',
          passengers: '20',
          crew: '6',
          consumables: '15',
        },
      ],
    },
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        CharacterDetailsDialogComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockCharacter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display character name in the dialog title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.textContent).toContain(mockCharacter.name);
  });

  it('should display character general information correctly', () => {
    const listItems = fixture.debugElement.queryAll(By.css('ul li'));
    expect(listItems[0].nativeElement.textContent).toContain(
      `Birth year: ${mockCharacter.birthYear}`
    );
    expect(listItems[1].nativeElement.textContent).toContain(
      `Eye color: ${mockCharacter.eyeColor}`
    );
    expect(listItems[2].nativeElement.textContent).toContain(
      `Gender: ${mockCharacter.gender}`
    );
    expect(listItems[3].nativeElement.textContent).toContain(
      `Hair color: ${mockCharacter.hairColor}`
    );
    expect(listItems[4].nativeElement.textContent).toContain(
      `Height: ${mockCharacter.height}`
    );
    expect(listItems[5].nativeElement.textContent).toContain(
      `Homeworld: ${mockCharacter.homeworld?.name}`
    );
    expect(listItems[6].nativeElement.textContent).toContain(
      `Skin color: ${mockCharacter.skinColor}`
    );
  });

  it('should display starships if present', () => {
    const starshipElements = fixture.debugElement.queryAll(By.css('.starship'));
    expect(starshipElements.length).toBe(
      mockCharacter.starshipConnection?.starships.length || -1
    );

    mockCharacter.starshipConnection?.starships.forEach((starship, index) => {
      expect(starshipElements[index].nativeElement.textContent).toContain(
        `Starship: ${starship.name}`
      );
    });
  });

  it('should close the dialog when "Ok" button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('button[mat-dialog-close]')
    ).nativeElement;
    button.click();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
