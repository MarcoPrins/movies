import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Stars from './Stars';

const propTypes = {
  rating: PropTypes.object,
};

class RatingEditor extends Component {
  constructor(props) {
    super(props);

    this.createOrUpdateRating = this.createOrUpdateRating.bind(this);
  }

  createOrUpdateRating(stars) {
    console.log(stars);
  }

  render() {
    const { rating } = this.props;
    const { stars } = rating;

    if (rating === null) return <span>No rating available</span>;

    return(
      <div className="ratingEditor">
        <Stars stars={rating.stars} onStarClick={this.createOrUpdateRating} />
      </div>
    );
  }
}

RatingEditor.propTypes = propTypes;
export default RatingEditor;
