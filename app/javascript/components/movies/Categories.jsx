import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  categories: PropTypes.object,
  selectCategory: PropTypes.func,
  selectedCategory: PropTypes.string,
  showCount: PropTypes.bool,
};

const defaultProps = {
  selectCategory: () => null,
  categories: {},
  showCount: true
};

const Categories = ({ selectCategory, selectedCategory, categories, showCount }) => {
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
            {category} {showCount && <span>({categories[category]})</span>}
          </button>
        );
      })}
    </div>
  );
};

Categories.propTypes = propTypes;
Categories.defaultProps = defaultProps;
export default Categories;
