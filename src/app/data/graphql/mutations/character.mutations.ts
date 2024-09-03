import { gql } from '@apollo/client/core';

export const GET_ALL_CHARACTERS_METADATA = gql`
  query AllPeople {
    allPeople {
      people {
        birthYear
        eyeColor
        gender
        hairColor
        height
        homeworld {
          name
        }
        name
        skinColor
        starshipConnection {
          starships {
            consumables
            crew
            name
            passengers
          }
        }
      }
    }
  }
`;
