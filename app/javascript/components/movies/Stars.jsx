import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  stars: PropTypes.number,
  onStarClick: PropTypes.func,
};

const defaultProps = {
  stars: 0,
  onStarClick: () => null,
};

const starClassName = (index, stars) => {
  return `star ${index <= stars ? 'active' : ''}`;
};

const Stars = ({ stars, onStarClick }) => {
  return(
    <span>
      {[1,2,3,4,5].map((i) => {
        return(
          <i
            key={i}
            className={starClassName(i, stars)}
            onClick={() => onStarClick(i)}
          />
        );
      })}
    </span>
  );
};

Stars.propTypes = propTypes;
Stars.defaultProps = defaultProps;
export default Stars;
