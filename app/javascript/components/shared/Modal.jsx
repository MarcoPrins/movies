import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
};

const Modal = ({ title, open, toggle, children }) => {
  return (
    <div className='modal' tabIndex='-1' role='dialog'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button onClick={toggle} type='button' className='close' aria-label='Close'>
              <span aria-hidden='false'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;
export default Modal;
