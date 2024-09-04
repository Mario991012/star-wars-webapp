import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../base/apollo-client.service';
import {
  IAllVehiclesData,
  IVehicle,
  IVehicleData,
} from '../interfaces/vehicle.interface';
import {
  GET_ALL_VEHICLES_METADATA,
  GET_VEHICLE_BY_ID,
} from '../mutations/vehicle.mutations';

/**
 * `VehicleService` is responsible for interacting with the GraphQL API to fetch vehicle-related data.
 * It provides methods to retrieve a specific vehicle by its ID and fetch metadata for all vehicles.
 *
 * @remarks
 * This service relies on `ApolloClientService` to execute GraphQL queries and returns the results as `Observable` streams.
 *
 * @decorator `@Injectable`
 */
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private apolloClientService: ApolloClientService) {}

  /**
   * Fetches a vehicle from the GraphQL API based on its ID.
   * Executes the `GET_VEHICLE_BY_ID` query with the provided vehicle ID as a variable.
   *
   * @param id - The ID of the vehicle to retrieve.
   * @returns An `Observable<IVehicle>` that emits the vehicle data for the given ID.
   *
   */
  public getVehicleById(id: string): Observable<IVehicle> {
    return new Observable<IVehicle>((observer) => {
      this.apolloClientService
        .executeQuery(GET_VEHICLE_BY_ID, { id })
        .then((result: IVehicleData) => {
          const vehicle: IVehicle = result?.data?.vehicle;
          observer.next(vehicle);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  /**
   * Fetches metadata for all vehicles from the GraphQL API.
   * Executes the `GET_ALL_VEHICLES_METADATA` query to retrieve metadata for all vehicles.
   *
   * @returns An `Observable<IVehicle[]>` that emits the list of all vehicles' metadata.
   *
   */
  public getAllVehiclesMetadata(): Observable<IVehicle[]> {
    return new Observable<IVehicle[]>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_ALL_VEHICLES_METADATA,
        })
        .then((result: IAllVehiclesData) => {
          observer.next(result?.data?.allVehicles?.vehicles);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
