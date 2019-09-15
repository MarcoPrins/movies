import React from 'react';
import { mount } from 'enzyme';

import Stars from '../../../components/movies/Stars';

describe('Stars', () => {
  describe('rendering stars', () => {
    it('renders the correct number of active stars',  () => {
      const fiveStars = mount(<Stars stars={5} />);
      expect(fiveStars.find('.star').map(star => star.props().className)).toEqual([
        'star active',
        'star active',
        'star active',
        'star active',
        'star active',
      ]);

      const threeStars = mount(<Stars stars={3} />);
      expect(threeStars.find('.star').map(star => star.props().className)).toEqual([
        'star active',
        'star active',
        'star active',
        'star ',
        'star ',
      ]);
    });

    it('renders 0 stars if number is not passed in', () => {
      const zeroStars = mount(<Stars />);
      expect(zeroStars.find('.star').map(star => star.props().className)).toEqual([
        'star ',
        'star ',
        'star ',
        'star ',
        'star ',
      ]);
    });
  });

  describe('onStarClick', () => {
    it('fires the passed in function with the number of the star clicked', () => {
      const onStarClick = jest.fn();
      const component = mount(<Stars stars={4} onStarClick={onStarClick} />);

      expect(component.find('.star').at(3).simulate('click'));
      expect(onStarClick).toHaveBeenCalledWith(4);
    });

    it('does not break on click if nothing is passed in', () => {
      const onStarClick = jest.fn();
      const component = mount(<Stars stars={4} />);

      expect(component.find('.star').at(3).simulate('click'));
      expect(component.find('.star.active').length).toBe(4);
    });
  })
});
