import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import MovieForm from '../../../components/movies/MovieForm';

describe('MovieForm', () => {
  it('makes a post request when you create a movie (no movie passed in)', async () => {
    const movieAttributes = {category: 'action', text: 'Test description', title: 'Movie 1'};

    axios.post = jest.fn(() => {
      return Promise.resolve({
        data: { id: 1, ...movieAttributes },
      });
    });

    const component = mount(
      <MovieForm categories={{action: 1}} />
    );
    component.find('input').at(0).simulate('change', {target: {value: 'Movie 1', name: 'title'}});
    component.find('input').at(0).simulate('change', {target: {value: 'Test description', name: 'text'}});
    component.find('Categories').find('button').at(0).simulate('click');
    component.find('button[type="submit"]').at(0).simulate('click');


    await wait(10); component.update();

    expect(axios.post).toHaveBeenCalledWith('/movies', movieAttributes);
  });

  it('makes a put request when you edit an existing movie (movie passed in)', async () => {
    const originalMovie = {id: 1, 'category': 'action', 'text': 'Test description', 'title': 'Movie 1'};
    const editedMovie = {category: 'drama', text: 'Test description EDIT', title: 'Movie 1 EDIT'}

    axios.put = jest.fn(() => {
      return Promise.resolve({
        data: editedMovie,
      });
    });

    const component = mount(
      <MovieForm movie={originalMovie} categories={{action: 1, drama: 1}} />
    );
    component.find('input').at(0).simulate('change', {target: {value: 'Movie 1 EDIT', name: 'title'}});
    component.find('input').at(0).simulate('change', {target: {value: 'Test description EDIT', name: 'text'}});
    component.find('Categories').find('button').at(1).simulate('click');
    component.find('button[type="submit"]').at(0).simulate('click');

    await wait(10); component.update();

    expect(axios.put)
      .toHaveBeenCalledWith('/movies/1', editedMovie);
  });
});
