import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const propTypes = {
  categories: PropTypes.object,
  selectFacet: PropTypes.func,
  selectedFacet: PropTypes.string,
  showCount: PropTypes.bool,
};

const defaultProps = {
  selectFacet: () => null,
  facets: {},
  showCount: true
};

const Facets = ({ selectFacet, selectedFacet, facets, showCount }) => {
  const facetNames = Object.keys(facets);

  return(
    <div>
      <div className='btn-group spacing-bottom' role='group'>
        {facetNames.map((facet) => {
          return(
            <button
              key={facet}
              onClick={() => selectFacet(facet)}
              type='button'
              className={`btn btn-info ${selectedFacet === facet ? 'active' : ''}`}
            >
              {facet} {showCount && <span>({facets[facet]})</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Facets.propTypes = propTypes;
Facets.defaultProps = defaultProps;
export default Facets;
