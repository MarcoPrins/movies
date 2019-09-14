import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  stars: PropTypes.number.isRequired,
  onStarClick: PropTypes.func,
};

const defaultProps = {
  onStarClick: () => null,
};

const starClassName = (index, stars) => {
  return `star ${index <= stars ? 'active' : ''}`;
};

const Stars = ({ stars, onStarClick }) => {
  return(
    <div>
      {[1,2,3,4,5].map((i) => {
        return(
          <i
            key={i}
            className={starClassName(i, stars)}
            onClick={() => onStarClick(i)}
          />
        );
      })}
    </div>
  );
};

Stars.propTypes = propTypes;
Stars.defaultProps = defaultProps;
export default Stars;
