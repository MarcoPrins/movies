import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import NewMovieButton from './NewMovieButton';
import MovieListing from './MoviesList/MovieListing';
import Categories from './Categories';
import PaginationLinks from '../shared/PaginationLinks';

const propTypes = {
  user: PropTypes.object,
};

// Container
class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      categories: {},
      page: 1,
      totalPages: 1,
      selectedCategory: null,
    }

    // Computed fields
    this.headers = this.headers.bind(this);
    this.heading = this.heading.bind(this);

    // Data fetching
    this.fetchData = this.fetchData.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);

    // Actions
    this.selectPage = this.selectPage.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
  }

  componentDidMount() {
    this.fetchData();
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

  fetchData() {
    this.fetchMovies();
    this.fetchCategories();
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

  fetchCategories() {
    axios.get('/movies/categories')
      .then((response) => {
        this.setState({categories: response.data})
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
    const { movies, selectedCategory, page, totalPages, categories, creatingNewMovie } = this.state;
    const { user } = this.props;

    return(
      <Fragment>
        <h1 className='spacing-bottom'>{this.heading()}</h1>

        <NewMovieButton successCallback={this.fetchData} categories={categories} />

        <Categories
          categories={categories}
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
            {movies.map((movie) => {
              return(
                <MovieListing
                  successCallback={this.fetchData}
                  categories={categories}
                  key={movie.id}
                  user={user}
                  movie={movie}
                />
              );
            })}
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
