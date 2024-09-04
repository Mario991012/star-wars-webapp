import { Component, inject } from '@angular/core';
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { ICharacter } from '../../../data/graphql/interfaces/character.interface';
import { CharacterService } from '../../../data/graphql/services/character.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CharacterDetailsDialogComponent } from '../../components/dialogs/character-details-dialog/character-details-dialog.component';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../../components/cards/character-card/character-card.component';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';
import { IFilterForm } from '../../interfaces/filter-form.interface';

/**
 * `PeopleListComponent` is responsible for displaying a list of characters and providing filtering options.
 * The component fetches metadata for all characters from a GraphQL service and displays the characters with filtering capabilities.
 * Users can filter by birth year, gender, name, and homeworld. Detailed character information can be viewed in a dialog.
 * 
 * @decorator `@Component`
 */
@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, MatDialogModule, FilterFormComponent],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  /**
   * An observable that emits the list of characters fetched from the GraphQL API.
   */
  characters$!: Observable<ICharacter[]>;

  /**
   * An observable that emits the filtered list of characters based on user input.
   */
  filteredCharacters$!: Observable<ICharacter[]>;

  /**
   * An observable that emits error messages in case of failures in fetching character data.
   */
  error$!: Observable<string>;

  /**
   * Subject used to manage the unsubscription of observables when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Injects the `CharacterService` to fetch character data and `MatDialog` to handle dialogs.
   */
  private characterService = inject(CharacterService);
  readonly dialog = inject(MatDialog);

  /**
   * Defines the filter fields available in the filtering form.
   */
  filterFields: IFilterForm[] = [
    { label: 'Birth year', formControlName: 'birthyear' },
    { label: 'Gender', formControlName: 'gender' },
    { label: 'Name', formControlName: 'name' },
    { label: 'Homeworld', formControlName: 'homeworld' }
  ];

  /**
   * It triggers the fetching of character metadata.
   */
  ngOnInit(): void {
    this.getCharactersMetadata();
  }

  /**
   * It completes the `destroy$` subject to clean up any subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Opens a dialog displaying detailed information about the selected character.
   * 
   * @param character - The selected `ICharacter` object for which the details will be shown in a dialog.
   */
  public openDataDialog(character: ICharacter): void {
    this.dialog.open(CharacterDetailsDialogComponent, {
      data: character
    });
  }

  /**
   * Fetches metadata for all characters from the GraphQL API using the `CharacterService`.
   * It also handles potential errors and initializes the filtered characters observable.
   */
  private getCharactersMetadata(): void {
    this.error$ = of('');
    
    this.characters$ = this.characterService.getAllCharactersMetadata().pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching character list:', error);
        this.error$ = of('Something went wrong while getting the characters. Reload the page and try again.');
        return of([]);
      })
    );
  
    this.filteredCharacters$ = this.characters$;
  
    this.error$ = this.characters$.pipe(
      map((characters) => (characters.length ? '' : 'No characters found'))
    );
  }
  

  /**
   * Handles changes in the filter form and updates the filtered characters list based on the provided filters.
   * 
   * @param filters - The object containing the filter values from the filter form.
   */
  onFilterChanged(filters: any): void {
    this.filteredCharacters$ = this.characters$.pipe(
      map(characters => characters.filter(character =>
        (!filters.birthyear || character?.birthYear?.toLocaleLowerCase().includes(filters.birthyear.toLocaleLowerCase())) &&
        (!filters.gender || character.gender?.toLocaleLowerCase().includes(filters.gender.toLocaleLowerCase())) &&
        (!filters.name || character.name?.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase())) &&
        (!filters.homeworld || character.homeworld?.name?.toLocaleLowerCase().includes(filters.homeworld.toLocaleLowerCase()))
      ))
    );
  }
}
