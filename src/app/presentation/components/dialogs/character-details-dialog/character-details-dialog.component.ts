import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  ICharacter,
  Starship,
} from '../../../../data/graphql/interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './character-details-dialog.component.html',
  styleUrls: ['./character-details-dialog.component.scss'],
})
export class CharacterDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CharacterDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ICharacter
  ) {}

  get birthYear(): string {
    return this.data?.birthYear || '';
  }

  get eyeColor(): string {
    return this.data?.eyeColor || '';
  }

  get gender(): string {
    return this.data?.gender || '';
  }

  get hairColor(): string {
    return this.data?.hairColor || '';
  }

  get height(): number {
    return this.data?.height || 0;
  }

  get homeworld(): string {
    return this.data?.homeworld?.name || '';
  }

  get name(): string {
    return this.data?.name || '';
  }

  get skinColor(): string {
    return this.data?.skinColor || '';
  }

  get starships(): Starship[] {
    return this.data?.starshipConnection?.starships || [];
  }
}
