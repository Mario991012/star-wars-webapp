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
  query VehicleById($id: ID!) {
    vehicle(id: $id) {
      cargoCapacity
      consumables
      costInCredits
      crew
      model
      name
      maxAtmospheringSpeed
      passengers
      vehicleClass
      manufacturers
      id
      filmConnection {
        films {
          title
          producers
          director
          releaseDate
        }
      }
      pilotConnection {
        pilots {
          name
        }
      }
    }
  }
`;

