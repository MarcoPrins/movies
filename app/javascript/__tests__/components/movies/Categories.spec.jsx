import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import Categories from '../../../components/movies/Categories';

const stubAxios = (categoriesResponse) => {
  axios.get = jest.fn(() => {
    return Promise.resolve({data: categoriesResponse});
  });
};

describe('Categories', () => {
  it('fetches categories and displays buttons for each of them, with selected one active', async () => {
    stubAxios({action: 2, drama: 1, suspense: 8});

    const component = mount(
      <Categories selectedCategory='drama' />
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
    stubAxios({action: 1, drama: 2, comedy: 3});
    const mockFunction = jest.fn();

    const component = mount(
      <Categories selectedCategory='drama' selectCategory={mockFunction} />
    );

    await wait(0); component.update();

    component.find('button').at(1).simulate('click');
    expect(mockFunction).toHaveBeenCalledWith('drama');
  });
});
