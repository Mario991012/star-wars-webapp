import { Component, Input } from '@angular/core';
import { ICharacter } from '../../../../data/graphql/interfaces/character.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChip, MatChipSet],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character: ICharacter | undefined;

}
