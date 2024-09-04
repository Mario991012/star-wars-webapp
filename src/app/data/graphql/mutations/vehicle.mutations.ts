import { DocumentNode, gql } from '@apollo/client/core';

export const GET_ALL_VEHICLES_METADATA: DocumentNode = gql`
  query AllVehicles {
    allVehicles {
      vehicles {
        cargoCapacity
        consumables
        costInCredits
        crew
        id
        model
        name
        maxAtmospheringSpeed
        passengers
        vehicleClass
        manufacturers
      }
      totalCount
    }
  }
`;

export const GET_VEHICLE_BY_ID: DocumentNode = gql`
  query VehicleById($id: String!) {
    allVehicles(filter: { id: $id }) {
      vehicles {
        cargoCapacity
        consumables
        costInCredits
        crew
        id
        model
        name
        maxAtmospheringSpeed
        passengers
        vehicleClass
        manufacturers
      }
    }
  }
`;

