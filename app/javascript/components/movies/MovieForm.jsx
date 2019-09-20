import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Categories from './Categories';

const propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    category: PropTypes.string,
  }),
  successCallback: PropTypes.func,
};

const defaultProps = {
  successCallback: () => null,
  movie: { id: null },
};

class MovieForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      category: '',
      ...props.movie,
    }

    this.createOrUpdateMovie = this.createOrUpdateMovie.bind(this);
    this.createMovie = this.createMovie.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createOrUpdateMovie(event) {
    event.preventDefault();
    const { id } = this.props.movie;
    id ? this.updateMovie() : this.createMovie();
  }

  createMovie() {
    const { title, text, category } = this.state;
    const { movie, successCallback } = this.props;

    axios.post('/movies', {
      title,
      text,
      category,
    })
      .then((response) => {
        alert('Movie created');
        successCallback(response);
      })
      .catch(error => alert(error.response.data));
  }

  updateMovie() {
    const { title, text, category } = this.state;
    const { movie, successCallback } = this.props;

    axios.put(`/movies/${movie.id}`, {
      title,
      text,
      category,
    })
      .then((response) => {
        alert('Movie updated');
        successCallback(response);
      })
      .catch(error => alert(error.response.data));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { id } = this.props.movie;
    const { title, text, category } = this.state;
    const inputProps = {
      className: 'form-control',
      onChange: this.handleChange,
    };

    return (
      <form>
        <div className='form-group'>
          <label htmlFor='title'>Title</label>
          <input
            name='title'
            type='text'
            value={title}
            {...inputProps}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='text'>Text</label>
          <input
            name='text'
            type='text'
            value={text}
            {...inputProps}
          />
        </div>

        <Categories
          selectedCategory={category}
          selectCategory={
            (category) => this.handleChange({
              target: {
                name: 'category',
                value: category,
              }
            })
          }
        />

        <button className='btn btn-info' type='submit' onClick={this.createOrUpdateMovie}>
          {id ? 'Update movie' : 'Create movie'}
        </button>
      </form>

    );
  }
}

MovieForm.propTypes = propTypes;
MovieForm.defaultProps = defaultProps;
export default MovieForm;
