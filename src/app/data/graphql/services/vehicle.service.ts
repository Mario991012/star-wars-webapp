import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloClientService } from '../base/apollo-client.service';
import { IAllVehiclesData, IVehicle } from '../interfaces/vehicle.interface';
import {
  GET_ALL_VEHICLES_METADATA,
  GET_VEHICLE_BY_ID,
} from '../mutations/vehicle.mutations';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private apolloClientService: ApolloClientService) {}

  public getVehicleById(id: string): Observable<IAllVehiclesData> {
    return new Observable<IAllVehiclesData>((observer) => {
      this.apolloClientService
        .getClient()
        .query({
          query: GET_VEHICLE_BY_ID,
          variables: {
            id,
          },
        })
        .then((result) => {
          observer.next(result?.data?.allVehicles?.vehicles);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

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
