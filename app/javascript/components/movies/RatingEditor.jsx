import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Stars from './Stars';

const propTypes = {
  rating: PropTypes.shape({
    id: PropTypes.number,
    movieId: PropTypes.number,
    stars: PropTypes.number,
  }),
  successCallback: PropTypes.func,
};

const defaultProps = {
  successCallback: () => null,
};

class RatingEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: props.rating,
    };

    this.createOrUpdateRating = this.createOrUpdateRating.bind(this);
    this.createRating = this.createRating.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  createOrUpdateRating(stars) {
    const { rating } = this.state;

    rating.id === null ?
      this.createRating(rating, stars) :
      this.updateRating(rating, stars);
  }

  createRating(rating, stars) {
    const { successCallback } = this.props;

    axios.post('/ratings', {
      stars: stars,
      movie_id: rating.movieId,
    })
      .then((response) => {
        this.setState({rating: response.data}, successCallback);
        alert('Rating created');
      })
      .catch(error => alert(error));
  }

  updateRating(rating, stars) {
    const { successCallback } = this.props;

    axios.put(`/ratings/${rating.id}`, {
      stars: stars,
    })
      .then((response) => {
        this.setState({rating: response.data}, successCallback);
        alert('Rating updated');
      })
      .catch(error => alert(error));
  }

  render() {
    const { rating } = this.state;

    if (!rating) return <span>No rating available</span>;

    return(
      <div className="ratingEditor">
        <Stars stars={rating.stars} onStarClick={this.createOrUpdateRating} />
      </div>
    );
  }
}

RatingEditor.propTypes = propTypes;
RatingEditor.defaultProps = defaultProps;
export default RatingEditor;
