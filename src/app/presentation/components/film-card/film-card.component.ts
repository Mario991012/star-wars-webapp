import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilmCardComponent {
  @Input() film: any;
}
