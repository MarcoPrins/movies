import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import axios from 'axios';

import MoviesList from '../../../components/movies/MoviesList';
import Stars from '../../../components/movies/Stars';

const stubAxios = (moviesResponse = [], categoriesResponse = {}, ratingsResponse = {}) => {
  axios.get = jest.fn((url) => {
    if(url === '/movies') {
      return Promise.resolve({
        data: {
          movies: moviesResponse,
          totalPages: 5,
        },
      });
    }
    else if (url === '/movies/category_breakdown') {
      return Promise.resolve({data: categoriesResponse});
    }
    else if (url === '/movies/rating_breakdown') {
      return Promise.resolve({data: ratingsResponse});
    }
    else {
      return undefined;
    }
  });
};

describe('MoviesList', () => {
  it('has the same number of headers as columns', async () => {
    stubAxios(
      [{id: 1, title: 'Movie 1', text: 'Description', category: 'action', averageStars: 2}]
    );

    const component = mount(<MoviesList />);
    await wait(0); component.update();

    const headers = component.instance().headers();
    const firstRow = component.find('table tbody tr').find('td');

    expect(headers.length).toBe(firstRow.length);
  });

  it('displays the correct rating headers based on wheter user is present', async () => {
    stubAxios();

    const componentWithoutUser = mount(<MoviesList />);
    expect(componentWithoutUser.instance().headers()[3]).toBe('Average Rating');

    const componentWitUser = mount(<MoviesList user={{id: 1, email: 'test@gmail.com'}} />);
    expect(componentWitUser.instance().headers()[3]).toBe('Your Rating');
  });

  it('fetches and displays movies', async () => {
    stubAxios(
      [
        {id: 1, title: 'Movie 1', text: 'Description 1', category: 'action', averageStars: 1},
        {id: 2, title: 'Movie 2', text: 'Description 2', category: 'action', averageStars: 2},
      ]
    );

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
        'You cannot edit this movie',
      ],
      [
        'Movie 2',
        'Description 2',
        'action',
        '',
        'You cannot edit this movie',
      ],
    ]);
  });

  describe('when you click a category', () => {
    it('fetches new movies with category filter', async () => {
      stubAxios(
        [],
        {'action': 5, 'comedy': 6},
      );

      const component = mount(<MoviesList />);
      await wait(0); component.update();

      stubAxios(
        [{id: 1, title: 'Movie 1', text: 'Description 1', category: 'action', averageStars: 1}],
        {'action': 5, 'comedy': 6},
      );

      expect(component.find('tbody tr').length).toBe(0);

      component.find('Facets').at(0).props().selectFacet('action');
      await wait(0); component.update();

      expect(component.find('tbody tr').length).toBe(1);
    });

    it('goes back to the first page', async () => {
      stubAxios(
        [],
        {'action': 5, 'comedy': 6},
      );

      const component = mount(<MoviesList />);
      await wait(0); component.update();

      // First go to page 2 and make sure we are there
      component.find('PaginationLinks').find('a').at(1).simulate('click');
      expect(component.state().page).toBe(2);

      // Click the category
      component.find('Facets').at(0).props().selectFacet('action');
      await wait(0); component.update();

      // Then check that we go back to page 1
      expect(axios.get).toHaveBeenCalledWith(
        '/movies', {'params': {category: 'action', rating: null, page: 1, search: ''}}
      );
      expect(component.state().page).toBe(1);
    });
  });

  describe('when you click a rating', () => {
    it('fetches new movies with rating filter', async () => {
      stubAxios(
        [],
        {},
        {'4': 1, '5': 1},
      );

      const component = mount(<MoviesList user={{id: 1}} />);
      await wait(0); component.update();

      stubAxios(
        [{id: 1, title: 'Movie 1', text: 'Description 1', category: 'action', averageStars: 1}],
      );

      expect(component.find('tbody tr').length).toBe(0);

      component.find('Facets').at(1).props().selectFacet('4');
      await wait(0); component.update();

      expect(component.find('tbody tr').length).toBe(1);
    });

    it('goes back to the first page', async () => {
      stubAxios(
        [],
        {},
        {'4': 1, '5': 1},
      );

      const component = mount(<MoviesList user={{id: 1}} />);
      await wait(0); component.update();

      // First go to page 2 and make sure we are there
      component.find('PaginationLinks').find('a').at(1).simulate('click');
      expect(component.state().page).toBe(2);

      // Click the category
      component.find('Facets').at(1).props().selectFacet('4');
      await wait(0); component.update();

      // Then check that we go back to page 1
      expect(axios.get).toHaveBeenCalledWith(
        '/movies', {'params': {category: null, rating: '4', page: 1, search: ''}}
      );
      expect(component.state().page).toBe(1);
    });
  });

  describe('when you search', () => {
    it('fetches a new movie with serch term', async () => {
      stubAxios();

      const component = mount(<MoviesList />);
      await wait(0); component.update();

      stubAxios(
        [{id: 1, title: 'Movie 1', text: 'Description 1', category: 'action', averageStars: 1}],
        {'action': 5, 'comedy': 6},
      );

      expect(component.find('tbody tr').length).toBe(0);

      component.find('input[name="search"]').simulate('change', {target: {name: 'search', value: 'Test'}})
      await wait(0); component.update();

      expect(axios.get).toHaveBeenCalledWith('/movies', {params: {category: null, rating: null, page: 1, search: 'Test'}});
      expect(component.find('tbody tr').length).toBe(1);
    });

    it('goes back to the first page', async () => {
      stubAxios();

      const component = mount(<MoviesList />);
      await wait(0); component.update();

      // First go to page 2 and make sure we are there
      component.find('PaginationLinks').find('a').at(1).simulate('click');
      expect(component.state().page).toBe(2);

      // Search
      component.find('input[name="search"]').simulate('change', {target: {name: 'search', value: 'Test'}})
      await wait(0); component.update();

      // Then check that we go back to page 1
      expect(axios.get).toHaveBeenCalledWith(
        '/movies', {'params': {category: null, rating: null, page: 1, search: 'Test'}}
      );
      expect(component.state().page).toBe(1);
    });
  });

  describe('when you click a pagination link', () => {
    it('fetches the new page', async () => {
      stubAxios();

      const component = mount(<MoviesList />);
      await wait(0); component.update();

      component.find('PaginationLinks').props().onPageClick(2);

      expect(axios.get).toHaveBeenCalledWith(
        '/movies', {'params': {category: null, rating: null, page: 2, search: ''}}
      );
    })
  })
});
