import { Component, inject } from '@angular/core';
import { catchError, map, Observable, Subject, takeUntil } from 'rxjs';
import { ICharacter } from '../../../data/graphql/interfaces/character.interface';
import { CharacterService } from '../../../data/graphql/services/character.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CharacterDetailsDialogComponent } from '../../components/dialogs/character-details-dialog/character-details-dialog.component';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../../components/cards/character-card/character-card.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, MatDialogModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.scss'
})
export class PeopleListComponent {
  characters$!: Observable<ICharacter[]>;
  error$!: Observable<string>;
  private destroy$ = new Subject<void>();
  private characterService = inject(CharacterService);
  readonly dialog = inject(MatDialog);

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
      map((result) => result || ["error"]),
      catchError((error) => {
        console.error('Error fetching character list:', error);
        return [
          error.message || 'An error occurred while fetching the character list.',
        ];
      })
    );

    this.error$ = this.characters$.pipe(
      map((characters) => (Array.isArray(characters) ? '' : characters))
    );
  }
}
