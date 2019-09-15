import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  selectCategory: PropTypes.func,
  selectedCategory: PropTypes.string,
};

const defaultProps = {
  selectCategory: () => null,
};

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: {},
    };

    this.fetchCategories = this.fetchCategories.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    axios.get('/movies/categories')
      .then((response) => {
        this.setState({categories: response.data})
      })
      .catch(error => alert(error));
  }

  render() {
    const { selectCategory, selectedCategory } = this.props;
    const { categories } = this.state;
    const categoryNames = Object.keys(categories);

    return(
      <div className='btn-group spacing-bottom' role='group' aria-label='Categories'>
        {categoryNames.map((category) => {
          return(
            <button
              key={category}
              onClick={() => selectCategory(category)}
              type='button'
              className={`btn btn-info ${selectedCategory === category ? 'active' : ''}`}
            >
              {category} ({categories[category]})
            </button>
          );
        })}
      </div>
    );
  };
};

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;
export default Categories;
