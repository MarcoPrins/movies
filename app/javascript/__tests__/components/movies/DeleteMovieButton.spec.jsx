import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import DeleteMovieButton from '../../../components/movies/DeleteMovieButton';

describe('DeleteMovieButton', () => {
  it('deletes a movie and calls the passed in successCallback', async () => {
    const movie = { id: 1 };
    window.confirm = jest.fn(() => true);
    axios.delete = jest.fn(() => {
      return Promise.resolve({
        data: movie,
      });
    });
    const successCallback = jest.fn();

    const component = mount(<DeleteMovieButton movie={movie} successCallback={successCallback} />);

    component.find('button').simulate('click');
    await wait(0); component.update();

    expect(axios.delete).toHaveBeenCalledWith('/movies/1');
    expect(successCallback).toHaveBeenCalledWith({data: movie});
  });
});
