import { IFilm } from "./film.interface";

export interface IPilot {
  name: string;
}

export interface IVehicle {
  cargoCapacity: number;
  consumables: string;
  costInCredits: number;
  crew: string;
  id: string;
  model: string;
  name: string;
  maxAtmospheringSpeed: number;
  passengers: string;
  vehicleClass: string;
  manufacturers: string[];
  filmConnection: {
    films: IFilm[];
  };
  pilotConnection: {
    pilots: IPilot[];
  };
}

export interface IAllVehiclesData {
  data: {
    allVehicles: {
      totalCount: number;
      vehicles: IVehicle[];
    };
  };
}

export interface IVehicleData {
  data: {
    vehicle: IVehicle;
  };
}
