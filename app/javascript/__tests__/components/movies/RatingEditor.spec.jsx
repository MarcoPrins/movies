import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import RatingEditor from '../../../components/movies/RatingEditor';
import Stars from '../../../components/movies/Stars';

describe('RatingEditor', () => {
  it('shows the correct stars, based on the rating',  () => {
    const component = mount(
      <RatingEditor rating={{id: 1, stars: 3, movieId: 1}} />
    );

    expect(component.find(Stars).length).toBe(1);
    expect(component.find(Stars).at(0).props().stars).toBe(3);
  });

  it('shows a fallback message if no rating is passed in', () => {
    const component = mount(
      <RatingEditor />
    );

    expect(component.text()).toBe('No rating available');
  });

  describe('submitting a rating', () => {
    describe('rating already exists', () => {
      it('updates the rating when you click on a star', async () => {
        axios.put = jest.fn(() => Promise.resolve({
          data: {id: 1, stars: 3, movieId: 1}
        }));

        const component = mount(
          <RatingEditor rating={{id: 1, stars: 5, movieId: 1}} />
        );

        component.find(Stars).find('.star').at(2).simulate('click');
        await wait(0); component.update();

        expect(axios.put).toHaveBeenCalledWith('/ratings/1', {'stars': 3});
        expect(component.find(Stars).props().stars).toBe(3);
      });
    });

    describe('rating does not exist yet (id is null)', () => {
      it('creates a new rating when you click on a star', async () => {
        axios.post = jest.fn(() => Promise.resolve({
          data: {id: 1, stars: 2, movieId: 1}
        }));

        const component = mount(
          <RatingEditor rating={{id: null, stars: null, movieId: 1}} />
        );

        component.find(Stars).find('.star').at(1).simulate('click');
        await wait(0); component.update();

        expect(axios.post).toHaveBeenCalledWith('/ratings', {'movie_id': 1, 'stars': 2});
        expect(component.find(Stars).props().stars).toBe(2);
      });
    });
  });
});
