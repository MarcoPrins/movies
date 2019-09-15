import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import axios from 'axios';

import MoviesList from '../../../components/movies/MoviesList';
import Stars from '../../../components/movies/Stars';

const stubAxios = (response) => {
  axios.get = jest.fn(() => Promise.resolve({
    data: response,
  }));
};

describe('MoviesList', () => {
  it('has the same number of headers as columns', async () => {
    stubAxios([{id: 1, title: 'Movie 1', text: 'Description', category: 'action', averageStars: 2}]);

    const component = mount(<MoviesList />);
    await wait(0); component.update();

    const headers = component.instance().headers();
    const firstRow = component.find('table tbody tr').find('td');

    expect(headers.length).toBe(firstRow.length);
  });

  it('displays the correct rating headers based on wheter user is present', async () => {
    stubAxios([]);

    const componentWithoutUser = mount(<MoviesList />);
    expect(componentWithoutUser.instance().headers()[3]).toBe('Average Rating');

    const componentWitUser = mount(<MoviesList user={{id: 1, email: 'test@gmail.com'}} />);
    expect(componentWitUser.instance().headers()[3]).toBe('Your Rating');
  });

  it('fetches and displays movies', async () => {
    stubAxios([
      {id: 1, title: 'Movie 1', text: 'Description 1', category: 'action', averageStars: 1},
      {id: 2, title: 'Movie 2', text: 'Description 2', category: 'action', averageStars: 2},
    ]);

    const component = mount(<MoviesList />);
    await wait(0); component.update();

    const rows = component.find('table tbody tr');
    const content = rows.map(row => row.find('td').map(td => td.text()));
    expect(content).toEqual([
      [
        'Movie 1',
        'Description 1',
        'action',
        '',
      ],
      [
        'Movie 2',
        'Description 2',
        'action',
        '',
      ],
    ]);
  });

  xit('fetches new movies with category filters if you click a category', () => {
  });
});
