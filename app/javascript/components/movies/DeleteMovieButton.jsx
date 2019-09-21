import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  successCallback: PropTypes.func,
};

const defaultProps = {
  successCallback: () => null,
};

class DeleteMovieButton extends Component {
  constructor(props) {
    super(props);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  deleteMovie() {
    const { movie, successCallback } = this.props;

    if (confirm('Are you sure you want to delete this movie?')) {
      axios.delete(`/movies/${movie.id}`)
        .then((response) => {
          alert('Movie deleted');
          successCallback(response);
        })
        .catch(error => alert(error));
    }
  }

  render() {
    return(
      <button onClick={this.deleteMovie} className='btn btn-outline-danger btn-small'>
        Delete
      </button>
    );
  }
};

DeleteMovieButton.propTypes = propTypes;
DeleteMovieButton.defaultProps = defaultProps;
export default DeleteMovieButton;