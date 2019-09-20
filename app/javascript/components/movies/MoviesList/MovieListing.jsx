import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RatingEditor from '../RatingEditor';
import Stars from '../Stars';

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  movie: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    text: PropTypes.string,
    category: PropTypes.string,
    currentUserRating: PropTypes.number,
    averageStars: PropTypes.number,
  }),
};

class MovieListing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user, movie } = this.props;

    return(
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.text}</td>
        <td>
          <span className="badge badge-info">
            {movie.category}
          </span>
        </td>
        <td>
          {user ?
            <RatingEditor rating={movie.currentUserRating} />
            :
            <Stars stars={movie.averageStars} />}
        </td>
        <td>
          {user.id === movie.userId ?
            <span>TODO: Movie form</span>
            :
            <span>TODO: Only edit your own movies</span>}
        </td>
      </tr>
    );
  }
}

MovieListing.propTypes = propTypes;
export default MovieListing;
