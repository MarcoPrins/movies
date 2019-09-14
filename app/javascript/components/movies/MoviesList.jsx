import React from 'react';
import PropTypes from 'prop-types';

import RatingEditor from './RatingEditor';
import Stars from './Stars';

const propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      averageStars: PropTypes.number,
      currentUserRating: PropTypes.number,
    }),
  ),
  user: PropTypes.shape({
    loggedIn: PropTypes.bool,
  }),
};

export const headers = () => {
  return [
    'Title',
    'Text',
    'Rating',
  ];
};

export const movieListing = (movie, user) => {
  return(
    <tr key={movie.id}>
      <td>{movie.title}</td>
      <td>{movie.text}</td>
      <td>
        {user.loggedIn ?
          <RatingEditor rating={movie.currentUserRating} />
          :
          <Stars stars={movie.averageStars} />}
      </td>
    </tr>
  );
};

const MoviesList = ({ movies, user }) => {
  return(
    <table className='table'>
      <thead>
        <tr>
          {headers().map((header) => <th key={header} scope='col'>{header}</th>)}
        </tr>
      </thead>

      <tbody>
        {movies.map((movie) => movieListing(movie, user))}
      </tbody>
    </table>
  );
};

MoviesList.propTypes = propTypes;
export default MoviesList;
