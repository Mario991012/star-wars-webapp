import { gql } from '@apollo/client/core';

export const GET_ALL_FILMS_METADATA = gql`
  query AllFilms {
    allFilms {
      totalCount
      films {
        created
        director
        edited
        producers
        releaseDate
        title
        episodeID
        id
      }
    }
  }
`;

export const GET_FILMS_BY_TITLE = gql`
  query FilmsByTitle($title: String!) {
    allFilms(filter: { title: $title }) {
      totalCount
      films {
        created
        director
        edited
        producers
        releaseDate
        title
        episodeID
        id
      }
    }
  }
`;

