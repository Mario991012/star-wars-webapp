import { Component, inject } from '@angular/core';
import { catchError, map, Observable, Subject, takeUntil } from 'rxjs';
import { IVehicle } from '../../../data/graphql/interfaces/vehicle.interface';
import { IFilterForm } from '../../interfaces/filter-form.interface';
import { VehicleService } from '../../../data/graphql/services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';
import { VehicleCardComponent } from '../../components/cards/vehicle-card/vehicle-card.component';
import { Router } from '@angular/router';

/**
 * `VehicleListComponent` is responsible for displaying a list of vehicles with filtering options.
 * The component fetches metadata for all vehicles from a GraphQL service and provides filtering capabilities 
 * based on vehicle attributes like name, manufacturers, vehicle class, and model.
 * Users can also navigate to the detailed view of a selected vehicle.
 * 
 * @remarks
 * The component uses Angular's reactive form to handle filters, subscribes to vehicle data streams, and provides error handling.
 * It navigates to the vehicle detail page when a vehicle is selected.
 * 
 * @decorator `@Component`
 */
@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FilterFormComponent, VehicleCardComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent {
  /**
   * Observable that emits the list of vehicles fetched from the GraphQL API.
   */
  vehicles$!: Observable<IVehicle[]>;

  /**
   * Observable that emits the filtered list of vehicles based on user input.
   */
  filteredVehicles$!: Observable<IVehicle[]>;

  /**
   * Observable that emits error messages in case of failures in fetching vehicle data.
   */
  error$!: Observable<string>;

  /**
   * Subject used to manage the unsubscription from observables when the component is destroyed.
   */
  private destroy$ = new Subject<void>();

  /**
   * Injects the `VehicleService` for fetching vehicle data and the `Router` for navigation.
   */
  private vehicleService = inject(VehicleService);
  private router = inject(Router);

  /**
   * Defines the filter fields available in the filtering form.
   */
  filterFields: IFilterForm[] = [
    { label: 'Name', formControlName: 'name' },
    { label: 'Manufacturers', formControlName: 'manufacturers' },
    { label: 'Vehicle class', formControlName: 'vehicleClass' },
    { label: 'Model', formControlName: 'model' }
  ];

  /**
   * It triggers the fetching of vehicle metadata.
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
   * Navigates to the vehicle detail page when a vehicle is selected.
   * 
   * @param character - The selected `IVehicle` object for which the details will be shown.
   */
  public goToDetails(character: IVehicle): void {
    console.log("character", character);
    this.router.navigate(["/star-wars/vehicles/details/", character.id]);
  }

  /**
   * Fetches metadata for all vehicles from the GraphQL API using the `VehicleService`.
   * It also handles potential errors and initializes the filtered vehicles observable.
   */
  private getCharactersMetadata(): void {
    this.vehicles$ = this.vehicleService.getAllVehiclesMetadata().pipe(
      takeUntil(this.destroy$),
      map((result) => result || []),
      catchError((error) => {
        console.error('Error fetching vehicle list:', error);
        return [];
      })
    );

    this.filteredVehicles$ = this.vehicles$;

    this.error$ = this.vehicles$.pipe(
      map((characters) => (characters.length ? `There has been an error` : 'No vehicles found'))
    );
  }

  /**
   * Handles changes in the filter form and updates the filtered vehicles list based on the provided filters.
   * 
   * @param filters - The object containing the filter values from the filter form.
   */
  onFilterChanged(filters: any): void {
    this.filteredVehicles$ = this.vehicles$.pipe(
      map(vehicles => vehicles.filter(vehicle =>
        (!filters.name || vehicle.name?.toLocaleLowerCase().includes(filters.name.toLocaleLowerCase())) &&
        (!filters.vehicleClass || vehicle.vehicleClass?.toLocaleLowerCase().includes(filters.vehicleClass.toLocaleLowerCase())) &&
        (!filters.model || vehicle.model?.toLocaleLowerCase().includes(filters.model.toLocaleLowerCase())) &&
        (!filters.manufacturers || vehicle.manufacturers?.some(mf => mf.toLocaleLowerCase().includes(filters.manufacturers.toLocaleLowerCase())))
      ))
    );
  }
  
}
