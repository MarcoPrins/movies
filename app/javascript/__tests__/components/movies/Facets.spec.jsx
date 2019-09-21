import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import wait from 'waait';

import Facets from '../../../components/movies/Facets';

const facetMappings = {
  action: 'Action',
  drama: 'Drama',
  'Random string': 'Other',
};

describe('Facets', () => {
  it('displays buttons for each facet, with selected one active', async () => {
    const component = mount(
      <Facets displayMapping={facetMappings} facets={{action: 2, drama: 1, 'Random string': 8}} selectedFacet='drama' />
    );
    await wait(0); component.update();

    const buttons = component.find('button');
    expect(buttons.map(button => button.props().className)).toEqual([
      'btn btn-info ',
      'btn btn-info active',
      'btn btn-info ',
    ]);
    expect(buttons.map(button => button.text())).toEqual([
      'Action (2)',
      'Drama (1)',
      'Other (8)',
    ]);
  });

  it('can hide the total count numbers', async () => {
    const component = mount(
      <Facets displayMapping={facetMappings} facets={{action: 2, drama: 1}} showCount={false} selectedFacet='drama' />
    );
    await wait(0); component.update();

    const buttons = component.find('button');
    expect(buttons.map(button => button.text())).toEqual([
      'Action ',
      'Drama ',
    ]);
  });

  it('calls the passed in selectFacet function when clicking a category', async () => {
    const mockFunction = jest.fn();

    const component = mount(
      <Facets displayMapping={facetMappings} facets={{action: 1, drama: 2, comedy: 3}} selectedFacet='drama' selectFacet={mockFunction} />
    );

    await wait(0); component.update();

    component.find('button').at(1).simulate('click');
    expect(mockFunction).toHaveBeenCalledWith('drama');
  });
});
