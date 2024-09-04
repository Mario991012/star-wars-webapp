import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from '../../../data/graphql/services/vehicle.service';
import { catchError, map, Observable, Subject, takeUntil } from 'rxjs';
import { IVehicle } from '../../../data/graphql/interfaces/vehicle.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinner],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit, OnDestroy {

  private readonly vehicleService = inject(VehicleService);
  private readonly route = inject(ActivatedRoute);
  vehicle$!: Observable<IVehicle>;
  error$!: Observable<string>;
  private destroy$ = new Subject<void>();
  public loading: boolean = false; 

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.loading = true;
      const id: string = params.get('id') || "";
      await this.getVehicleData( id );
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getVehicleData( id: string ): void {
    this.vehicle$ = this.vehicleService.getVehicleById( id ).pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching vehicle data:', error);
        return [];
      })
    );
  }

}
