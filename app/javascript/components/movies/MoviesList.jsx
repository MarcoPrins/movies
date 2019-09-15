import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import RatingEditor from './RatingEditor';
import Stars from './Stars';

const propTypes = {
  user: PropTypes.shape({
    loggedIn: PropTypes.bool,
  }),
};

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    }

    this.headers = this.headers.bind(this);
    this.movieListing = this.movieListing.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  componentDidMount() {
    this.fetchMovies({});
  }

  headers() {
    return [
      'Title',
      'Text',
      'Rating',
    ];
  }

  movieListing(movie) {
    const { user } = this.props;

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
  }

  fetchMovies(params) {
    axios.get('/movies', params)
      .then((response) => {
        this.setState({movies: response.data});
      })
      .catch(error => alert(error));
  }

  render() {
    const { movies } = this.state;

    return(
      <Fragment>
        <div>
          Hello
        </div>
        <table className='table'>
          <thead>
            <tr>
              {this.headers().map((header) => <th key={header} scope='col'>{header}</th>)}
            </tr>
          </thead>

          <tbody>
            {movies.map((movie) => this.movieListing(movie))}
          </tbody>
        </table>
      </Fragment>
    );
  }
};

MoviesList.propTypes = propTypes;
export default MoviesList;
