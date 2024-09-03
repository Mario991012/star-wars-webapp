import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleListComponent } from './people-list.component';
import { of } from 'rxjs';
import { CharacterService } from '../../../data/graphql/services/character.service';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CharacterCardComponent } from '../../components/cards/character-card/character-card.component';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';
import { ICharacter } from '../../../data/graphql/interfaces/character.interface';
import { MockComponent } from 'ng-mocks';

describe('PeopleListComponent', () => {
  let component: PeopleListComponent;
  let fixture: ComponentFixture<PeopleListComponent>;
  let characterServiceSpy: jasmine.SpyObj<CharacterService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  const mockCharacters: ICharacter[] = [
    { name: 'Luke Skywalker', birthYear: '19BBY', eyeColor: 'blue', gender: 'male', hairColor: 'blond', height: 172, homeworld: { name: 'Tatooine' }, skinColor: 'fair', starshipConnection: { starships: [] } },
    { name: 'Leia Organa', birthYear: '19BBY', eyeColor: 'brown', gender: 'female', hairColor: 'brown', height: 150, homeworld: { name: 'Alderaan' }, skinColor: 'light', starshipConnection: { starships: [] } }
  ];

  beforeEach(async () => {
    characterServiceSpy = jasmine.createSpyObj('CharacterService', ['getAllCharactersMetadata']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [PeopleListComponent, NoopAnimationsModule],
      providers: [
        { provide: CharacterService, useValue: characterServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
      declarations: [
        MockComponent(CharacterCardComponent),
        MockComponent(FilterFormComponent)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleListComponent);
    component = fixture.componentInstance;
    characterServiceSpy.getAllCharactersMetadata.and.returnValue(of(mockCharacters));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllCharactersMetadata on init', () => {
    expect(characterServiceSpy.getAllCharactersMetadata).toHaveBeenCalled();
  });

  it('should filter characters based on the filter criteria', () => {
    fixture.detectChanges();

    const filters = { name: 'Leia', gender: 'female', birthyear: '19BBY', homeworld: 'Alderaan' };
    component.onFilterChanged(filters);

    component.filteredCharacters$.subscribe((filteredCharacters) => {
      expect(filteredCharacters.length).toBe(1);
      expect(filteredCharacters[0].name).toBe('Leia Organa');
    });
  });

  it('should display an error message when no characters are found', () => {
    characterServiceSpy.getAllCharactersMetadata.and.returnValue(of([]));
    fixture.detectChanges();

    component.error$.subscribe((errorMessage) => {
      expect(errorMessage).toBe('There has been an error');
    });
  });

  it('should unsubscribe from observables on component destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
