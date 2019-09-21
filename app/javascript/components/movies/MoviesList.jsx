import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import NewMovieButton from './NewMovieButton';
import MovieListing from './MoviesList/MovieListing';
import Facets from './Facets';
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
      ratings: {},
      selectedCategory: null,
      selectedRating: null,
      page: 1,
      totalPages: 1,
      search: '',
    }

    // Computed fields
    this.headers = this.headers.bind(this);
    this.heading = this.heading.bind(this);

    // Data fetching
    this.fetchData = this.fetchData.bind(this);
    this.fetchMovies = this.fetchMovies.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.fetchRatings = this.fetchRatings.bind(this);

    // Actions
    this.selectPage = this.selectPage.bind(this);
    this.selectFacet = this.selectFacet.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
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
    this.fetchRatings();
  }

  fetchMovies() {
    const { selectedCategory, selectedRating, page, search } = this.state;

    axios.get('/movies', {
      params: {
        category: selectedCategory,
        rating: selectedRating,
        page,
        search,
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
    axios.get('/movies/category_breakdown')
      .then((response) => {
        this.setState({categories: response.data})
      })
      .catch(error => alert(error));
  }

  fetchRatings() {
    axios.get('/movies/rating_breakdown')
      .then((response) => {
        this.setState({ratings: response.data})
      })
      .catch(error => alert(error));
  }

  selectFacet(name, value) {
    const selectedFacet = this.state[name];
    if (value === selectedFacet) value = null;
    this.updateFilter({target: {name: name, value: value}});
  }

  selectPage(page) {
    this.setState({ page }, this.fetchMovies);
  }

  updateFilter(event) {
    const { target } = event;
    this.setState({ [target.name]: target.value, page: 1 }, this.fetchMovies);
  }

  render() {
    const { movies, selectedCategory, selectedRating, page, totalPages, categories, ratings, creatingNewMovie, search } = this.state;
    const { user } = this.props;

    return(
      <Fragment>
        <h1 className='spacing-bottom'>{this.heading()}</h1>
        <NewMovieButton successCallback={this.fetchData} categories={categories} />

        <input
          type='text'
          name='search'
          value={search}
          onChange={this.updateFilter}
          className='form-control spacing-bottom'
          placeholder='Search title or text'
        />

        <div>
          Filter by category:
          <Facets
            facets={categories}
            selectedFacet={selectedCategory}
            selectFacet={(value) => this.selectFacet('selectedCategory', value)}
          />
        </div>

        {user &&
          <div>
            Filter by your rating:
            <Facets
              facets={ratings}
              selectedFacet={selectedRating}
              selectFacet={(value) => this.selectFacet('selectedRating', value)}
            />
          </div>}

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
