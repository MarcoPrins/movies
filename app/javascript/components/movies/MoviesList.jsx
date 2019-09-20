import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import MovieListing from './MoviesList/MovieListing';
import Categories from './Categories';
import PaginationLinks from '../shared/PaginationLinks';

const propTypes = {
  user: PropTypes.object,
};

class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      page: 1,
      totalPages: 1,
      selectedCategory: null,
    }

    this.headers = this.headers.bind(this);
    this.heading = this.heading.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.selectPage = this.selectPage.bind(this);
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
      'Edit',
    ];
  }

  heading() {
    const { selectedCategory } = this.state;
    return selectedCategory ?
      `Movies: ${selectedCategory}` :
      'All movies';
  }

  fetchMovies() {
    const { selectedCategory, page } = this.state;

    axios.get('/movies', {
      params: {
        category: selectedCategory,
        page,
      },
    })
      .then((response) => {
        this.setState({
          movies: response.data.movies,
          totalPages: response.data.totalPages,
        });
      })
      .catch(error => alert(error));
  }

  selectCategory(category) {
    const { selectedCategory } = this.state;
    if (category === selectedCategory) category = null;

    this.setState(
      {selectedCategory: category, page: 1},
      this.fetchMovies
    );
  }

  selectPage(page) {
    this.setState({ page }, this.fetchMovies);
  }

  render() {
    const { movies, selectedCategory, page, totalPages } = this.state;
    const { user } = this.props;

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
            {movies.map(movie => <MovieListing key={movie.id} user={user} movie={movie} />)}
          </tbody>
        </table>

        <PaginationLinks
          page={page}
          totalPages={totalPages}
          onPageClick={this.selectPage}
          autoHide
        />
      </Fragment>
    );
  }
};

MoviesList.propTypes = propTypes;
export default MoviesList;
