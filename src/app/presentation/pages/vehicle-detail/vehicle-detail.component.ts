import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from '../../../data/graphql/services/vehicle.service';
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { IVehicle } from '../../../data/graphql/interfaces/vehicle.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PipesModule } from '../../shared/pipes/pipes.module';

/**
 * `VehicleDetailComponent` is responsible for displaying detailed information about a specific vehicle.
 * It fetches vehicle data based on the route parameter (vehicle ID) and handles any errors during data retrieval.
 * 
 * @remarks
 * The component uses the `VehicleService` to fetch vehicle data and listens for route changes via the `ActivatedRoute`.
 * It displays the vehicle details and shows a loading indicator while the data is being fetched.
 * 
 * @decorator `@Component`
 */
@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, PipesModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent implements OnInit, OnDestroy {
  /**
   * Observable that emits the vehicle data fetched from the GraphQL API.
   */
  vehicle$!: Observable<IVehicle>;

  /**
   * Observable that emits an error message if there is an issue fetching vehicle data.
   */
  error$!: Observable<string>;

  /**
   * Subject used to manage the unsubscription from observables when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Indicates whether the vehicle data is currently being loaded.
   */
  public loading: boolean = false; 

  /**
   * Injects the required services including `VehicleService` for fetching vehicle data and 
   * `ActivatedRoute` to access the route parameters.
   */
  private readonly vehicleService = inject(VehicleService);
  private readonly route = inject(ActivatedRoute);

  /**
   * It listens to the route parameters to get the vehicle ID and triggers data fetching based on the ID.
   */
  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async params => {
      this.error$ = of("Loading...");
      const id: string = params.get('id') || "";
      await this.getVehicleData(id);
      this.loading = false;
    });
  }

  /**
   * It completes the `destroy$` subject to clean up any subscriptions.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fetches vehicle data by ID from the GraphQL API using the `VehicleService`.
   * It subscribes to the result and handles any errors that occur during the data retrieval process.
   * 
   * @param id - The ID of the vehicle to fetch data for.
   */
  private getVehicleData(id: string): void {
    this.error$ = of("");
    this.vehicle$ = this.vehicleService.getVehicleById(id).pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching character data:', error);
        this.error$ = of('Something went wrong while getting the character. Reload the page and try again.');
        return [];
      })
    );
  }

}
