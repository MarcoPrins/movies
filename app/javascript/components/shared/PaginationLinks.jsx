import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageClick: PropTypes.func.isRequired,
  autoHide: PropTypes.bool,
};

const defaultProps = {
  onPageClick: () => null,
};

const PaginationLinks = ({ page, totalPages, onPageClick, autoHide }) => {
  if (autoHide && totalPages === 1) return <Fragment />;
  const pageNumbers = Array.from({length: totalPages}, (v, k) => k + 1);

  return(
    <ul className='pagination'>
      {pageNumbers.map((number) => {
        const active = (number == page);

        return(
          <li key={number} className={`page-item ${active ? 'active' : ''}`}>
            <a className='page-link' onClick={() => onPageClick(number)}>{number}</a>
          </li>
        );
      })}
    </ul>
  );
};

PaginationLinks.propTypes = propTypes;
PaginationLinks.defaultProps = defaultProps;
export default PaginationLinks;
