import { Character } from './character.interface';
import { Planet } from './planet.interface';

export interface Film {
  created: string;
  director: string;
  edited: string;
  producers: string[];
  releaseDate: string;
  title: string;
  episodeID: number;
  id: string;
  openingCrawl: string;
  characterConnection: {
    characters: Character[];
  };
  planetConnection: {
    planets: Planet[];
  };
}

export interface AllFilmsData {
  data: {
    allFilms: {
      totalCount: number;
      films: Film[];
    };
  };
}
