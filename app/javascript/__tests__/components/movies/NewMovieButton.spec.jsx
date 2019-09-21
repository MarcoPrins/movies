import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';

import NewMovieButton from '../../../components/movies/NewMovieButton';

describe('NewMovieButton', () => {
  it('renders a button to open new movie form', () => {
    const component = shallow(<NewMovieButton />);

    expect(component.html()).toBe(
      shallow(
        <div className='spacing-bottom'>
          <button className='btn btn-primary'>New movie</button>
        </div>
      ).html()
    );
  });

  it('opens a new movie form', async () => {
    const component = mount(<NewMovieButton />);
    expect(component.find('MovieForm').length).toBe(0);

    component.find('button').simulate('click');
    await wait(0); component.update();

    expect(component.find('MovieForm').length).toBe(1);
  });
});
