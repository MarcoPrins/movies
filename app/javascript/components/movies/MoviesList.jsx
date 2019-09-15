import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import RatingEditor from './RatingEditor';
import Categories from './Categories';
import Stars from './Stars';

const propTypes = {
  user: PropTypes.object,
};

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      selectedCategory: null,
    }

    this.headers = this.headers.bind(this);
    this.heading = this.heading.bind(this);
    this.movieListing = this.movieListing.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);

    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.fetchMovies();
  }

  headers() {
    const { user } = this.props;

    return [
      'Title',
      'Text',
      'Category',
      (user ? 'Your Rating' : 'Average Rating'),
    ];
  }

  heading() {
    const { selectedCategory } = this.state;
    return selectedCategory ?
      `Movies: ${selectedCategory}` :
      'All movies';
  }

  movieListing(movie) {
    const { user } = this.props;

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
      </tr>
    );
  }

  fetchMovies() {
    const { selectedCategory } = this.state;

    axios.get('/movies', {params: {category: selectedCategory}})
      .then((response) => {
        this.setState({movies: response.data});
      })
      .catch(error => alert(error));
  }

  selectCategory(category) {
    const { selectedCategory } = this.state;
    if (category === selectedCategory) category = null;

    this.setState(
      {selectedCategory: category},
      this.fetchMovies
    )
  }

  render() {
    const { movies, selectedCategory } = this.state;

    return(
      <Fragment>
        <h1 className='spacing-bottom'>{this.heading()}</h1>

        <Categories
          selectedCategory={selectedCategory}
          selectCategory={this.selectCategory}
        />

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
