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
    axios.post('/ratings', {
      stars: stars,
      movie_id: rating.movieId,
    })
      .then((response) => {
        this.setState({rating: response.data});
        alert('Rating created');
      })
      .catch(error => alert(error));
  }

  updateRating(rating, stars) {
    axios.put(`/ratings/${rating.id}`, {
      stars: stars,
    })
      .then((response) => {
        this.setState({rating: response.data});
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
export default RatingEditor;
