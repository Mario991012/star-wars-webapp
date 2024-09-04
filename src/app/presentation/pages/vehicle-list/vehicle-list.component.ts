import { Component, inject } from '@angular/core';
import { catchError, map, Observable, Subject, takeUntil } from 'rxjs';
import { IVehicle } from '../../../data/graphql/interfaces/vehicle.interface';
import { IFilterForm } from '../../interfaces/filter-form.interface';
import { VehicleService } from '../../../data/graphql/services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FilterFormComponent } from '../../components/filters/filter-form/filter-form.component';
import { VehicleCardComponent } from '../../components/cards/vehicle-card/vehicle-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FilterFormComponent, VehicleCardComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent {
  vehicles$!: Observable<IVehicle[]>;
  filteredVehicles$!: Observable<IVehicle[]>;
  error$!: Observable<string>;
  private destroy$ = new Subject<void>();
  private vehicleService = inject(VehicleService);
  private router = inject(Router);

  filterFields: IFilterForm[] = [
    { label: 'Name', formControlName: 'name' },
    { label: 'Manufacturers', formControlName: 'manufacturers' },
    { label: 'Vehicle class', formControlName: 'vehicle_class' },
    { label: 'Model', formControlName: 'model' }
  ];


  ngOnInit(): void {
    this.getCharactersMetadata();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToDetails(character: IVehicle): void {
    console.log("character", character)
    this.router.navigate(["/star-wars/vehicles/details/", character.id ]);
  }

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
