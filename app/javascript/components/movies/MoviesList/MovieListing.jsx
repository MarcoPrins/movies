import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RatingEditor from '../RatingEditor';
import Stars from '../Stars';
import MovieForm from '../MovieForm';
import Modal from '../../shared/Modal';

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  movie: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    text: PropTypes.string,
    category: PropTypes.string,
    currentUserRating: PropTypes.object,
    averageStars: PropTypes.number,
  }),
  successCallback: PropTypes.func,
  categories: PropTypes.object,
};

class MovieListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      movie: props.movie,
    };

    this.toggleEdit = this.toggleEdit.bind(this);
    this.ratingColumn = this.ratingColumn.bind(this);
    this.editColumn = this.editColumn.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
  }

  toggleEdit() {
    this.setState(prevState => ({ editing: !prevState.editing }));
  }

  ratingColumn() {
    const { user, movie } = this.props;

    if (user) {
      return <RatingEditor rating={movie.currentUserRating} />;
    }
    else {
      return <Stars stars={movie.averageStars} />;
    }
  }

  editColumn() {
    const { user, categories } = this.props;
    const { editing, movie } = this.state;

    if (editing) {
      return(
        <Modal title='Edit Movie' toggle={this.toggleEdit} open={editing}>
          <MovieForm categories={categories} movie={movie} successCallback={this.afterUpdate} />
        </Modal>
      );
    }
    else if (user && user.id === movie.userId) {
      return <a onClick={this.toggleEdit}>Edit</a>;
    }
    else {
      return <span>You cannot edit this movie</span>;
    }
  }

  afterUpdate(response) {
    const { successCallback } = this.props;

    this.setState(
      { movie: response.data, editing: false },
      successCallback,
    );
  }

  render() {
    const { user } = this.props;
    const { editing, movie } = this.state;

    return(
      <tr key={movie.id}>
        <td>{movie.title}</td>
        <td>{movie.text}</td>
        <td>
          <span className="badge badge-info">
            {movie.category}
          </span>
        </td>
        <td>{this.ratingColumn()}</td>
        <td>{this.editColumn()}</td>
      </tr>
    );
  }
}

MovieListing.propTypes = propTypes;
export default MovieListing;
