export interface Starship {
  consumables: string;
  crew: string;
  name: string;
  passengers: string;
}

export interface Homeworld {
  name: string;
}

export interface StarshipConnection {
  starships: Starship[];
}

export interface ICharacter {
  birthYear?: string;
  eyeColor?: string;
  gender?: string;
  hairColor?: string;
  height?: number;
  homeworld?: Homeworld;
  name: string;
  skinColor?: string;
  starshipConnection?: StarshipConnection;
}

export interface AllCharactersData {
  data: {
    allPeople: {
      totalCount: number;
      people: ICharacter[];
    };
  };
}
