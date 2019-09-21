import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  ratings: PropTypes.object,
  selectRating: PropTypes.func,
  selectedRating: PropTypes.string,
};

const defaultProps = {
  selectRating: () => null,
  ratings: {},
};

const Ratings = ({ selectRating, selectedRating, ratings }) => {
  const ratingNames = Object.keys(ratings);

  return(
    <div className='btn-group spacing-bottom' role='group' aria-label='Ratings'>
      {ratingNames.map((rating) => {
        return(
          <button
            key={rating}
            onClick={() => selectRating(rating)}
            type='button'
            className={`btn btn-info ${selectedrating === rating ? 'active' : ''}`}
          >
            {rating} <span>({Ratings[rating]})</span>
          </button>
        );
      })}
    </div>
  );
};

Ratings.propTypes = propTypes;
Ratings.defaultProps = defaultProps;
export default Ratings;