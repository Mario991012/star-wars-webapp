import { Component, Input } from '@angular/core';
import { IVehicle } from '../../../../data/graphql/interfaces/vehicle.interface';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { PipesModule } from '../../../shared/pipes/pipes.module';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChip, MatChipSet, PipesModule],
  templateUrl: './vehicle-card.component.html',
  styleUrl: './vehicle-card.component.scss',
})
export class VehicleCardComponent {
  @Input() vehicle: IVehicle | undefined;
}
