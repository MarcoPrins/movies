import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import MovieListing from '../../../../components/movies/MoviesList/MovieListing';

const movie = {
  id: 1,
  userId: 2,
  text: 'Test text',
  category: 'drama',
  currentUserRating: {id: 3, userId: 4, stars: 3},
  averageStars: 4,
};

describe('MovieListing', () => {
  describe('edit button', () => {
    it('shows an edit button if you are the movie owner', () => {
      const component = shallow(<MovieListing movie={movie} user={{id: 2}} />);

      expect(component.find('td').at(4).html()).toBe(
        shallow(<td><button className='btn btn-outline-secondary btn-small'>Edit</button></td>).html()
      );
    });

    it('does not show an edit button if you are not the movie owner', () => {
      const component = shallow(<MovieListing movie={movie} user={{id: 20}} />);

      expect(component.find('td').at(4).html()).toBe(
        shallow(<td></td>).html()
      );
    });

    it('does not show an edit button if you are logged out (user is nil)', () => {
      const component = shallow(<MovieListing movie={movie} />);

      expect(component.find('td').at(4).html()).toBe(
        shallow(<td></td>).html()
      );
    });
  });

  describe('editing a movie', () => {
    it('opens a modal with movie form', async () => {
      const component = mount(
        <MovieListing
          movie={movie}
          user={{id: 2}}
          categories={{drama: 8}}
        />
      );
      component.find('td').at(4).find('button').simulate('click');
      await wait(0); component.update();

      const formProps = component.find('MovieForm').at(0).props();
      expect(formProps.movie).toEqual(movie);
      expect(formProps.categories).toEqual({drama: 8});
    });
  });
});
