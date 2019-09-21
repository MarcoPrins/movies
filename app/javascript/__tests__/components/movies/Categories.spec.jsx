import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import Categories from '../../../components/movies/Categories';

describe('Categories', () => {
  it('fetches categories and displays buttons for each of them, with selected one active', async () => {
    const component = mount(
      <Categories categories={{action: 2, drama: 1, suspense: 8}} selectedCategory='drama' />
    );
    await wait(0); component.update();

    const buttons = component.find('button');
    expect(buttons.map(button => button.props().className)).toEqual([
      'btn btn-info ',
      'btn btn-info active',
      'btn btn-info ',
    ]);
    expect(buttons.map(button => button.text())).toEqual([
      'action (2)',
      'drama (1)',
      'suspense (8)',
    ]);
  });

  it('calls the passed in selectCategory function when clicking a category', async () => {
    const mockFunction = jest.fn();

    const component = mount(
      <Categories categories={{action: 1, drama: 2, comedy: 3}} selectedCategory='drama' selectCategory={mockFunction} />
    );

    await wait(0); component.update();

    component.find('button').at(1).simulate('click');
    expect(mockFunction).toHaveBeenCalledWith('drama');
  });
});
