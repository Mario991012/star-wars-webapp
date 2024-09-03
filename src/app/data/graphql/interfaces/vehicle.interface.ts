export interface IVehicle {
  cargoCapacity: number;
  consumables: string;
  costInCredits: number;
  crew: string;
  manufacturers: string[];
  model: string;
  name: string;
  maxAtmospheringSpeed: number;
  passengers: string;
  vehicleClass: string;
}

export interface IAllVehiclesData {
  data: {
    allVehicles: {
      totalCount: number;
      vehicles: IVehicle[];
    };
  };
}
