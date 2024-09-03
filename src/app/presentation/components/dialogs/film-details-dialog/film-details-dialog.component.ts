import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-film-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './film-details-dialog.component.html',
  styleUrl: './film-details-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<FilmDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      characters: string[];
      planets: string[];
    }
  ) {}

  get title(): string {
    return this.data.title;
  }

  get content(): string {
    return this.data.content;
  }

  get characters(): string[] {
    return this.data.characters;
  }

  get planets(): string[] {
    return this.data.planets;
  }
}
