import React from 'react';
import { mount } from 'enzyme';
// import axios from 'axios';
// import wait from 'waait';

import MovieListing from '../../../../components/movies/MoviesList/MovieListing';

describe('MovieListing', () => {
  describe('edit button', () => {
    it('shows an edit button if you are the movie owner');
    it('does not show an edit button if you are not the movie owner');
    it('does not show an edit button if you are logged out (user is nil)');
  });

  describe('editing a movie', () => {
    it('opens a modal with movie form');
    it('updates after editing a movie');
  });
});
