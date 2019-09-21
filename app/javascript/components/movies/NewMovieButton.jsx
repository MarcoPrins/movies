import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../shared/Modal';
import MovieForm from './MovieForm';

const propTypes = {
  successCallback: PropTypes.func,
  categories: PropTypes.object,
};

const defaultProps = {
  categories: {},
  successCallback: () => null,
}

class NewMovieButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({modalOpen: !prevState.modalOpen}));
  }

  onSuccess() {
    const { successCallback } = this.props;
    this.setState({modalOpen: false}, successCallback);
  }

  render() {
    const { modalOpen } = this.state;
    const { categories } = this.props;

    return(
      <div className='spacing-bottom'>
        <button className='btn btn-primary' onClick={this.toggleModal}>
          New movie
        </button>
        {modalOpen &&
          <Modal title='New movie' toggle={this.toggleModal}>
            <MovieForm categories={categories} successCallback={this.onSuccess} />
          </Modal>}
      </div>
    );
  }
}

NewMovieButton.propTypes = propTypes;
NewMovieButton.defaultProps = defaultProps;
export default NewMovieButton;
