import { Component, inject } from '@angular/core';
import { catchError, map, Observable, Subject, takeUntil } from 'rxjs';
import { ICharacter } from '../../../data/graphql/interfaces/character.interface';
import { CharacterService } from '../../../data/graphql/services/character.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CharacterDetailsDialogComponent } from '../../components/dialogs/character-details-dialog/character-details-dialog.component';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../../components/cards/character-card/character-card.component';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, MatDialogModule, FilterFormComponent],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  characters$!: Observable<ICharacter[]>;
  filteredCharacters$!: Observable<ICharacter[]>;
  error$!: Observable<string>;
  private destroy$ = new Subject<void>();
  private characterService = inject(CharacterService);
  readonly dialog = inject(MatDialog);
  filterFields = [
    { label: 'Birth year', formControlName: 'birthyear' },
    { label: 'Gender', formControlName: 'gender' },
    { label: 'Name', formControlName: 'name' },
    { label: 'Homeworld', formControlName: 'homeworld' }
  ];


  ngOnInit(): void {
    this.getCharactersMetadata();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDataDialog(character: ICharacter): void {
    this.dialog.open(CharacterDetailsDialogComponent, {
      data: character
    });
  }

  private getCharactersMetadata(): void {
    this.characters$ = this.characterService.getAllCharactersMetadata().pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching character list:', error);
        return [];
      })
    );

    this.filteredCharacters$ = this.characters$;

    this.error$ = this.characters$.pipe(
      map((characters) => (characters.length ? '' : 'No characters found'))
    );
  }

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
