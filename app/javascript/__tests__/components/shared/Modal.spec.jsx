import React from 'react';
import { shallow, mount } from 'enzyme';
import wait from 'waait';

import Modal from '../../../components/shared/Modal';

describe('Modal', () => {
  it('renders the correct output', () => {
    const component = shallow(<Modal toggle={jest.fn()} title='Test title'>test content</Modal>);

    expect(component.find('.modal').length).toBe(1);

    expect(component.find('.modal-title').html()).toBe(
      shallow(<h5 className='modal-title'>Test title</h5>).html()
    );

    expect(component.find('.modal-body').html()).toBe(
      shallow(<div className='modal-body'>test content</div>).html()
    );
  });

  it('calls the passed in toggle function if you click close', async () => {
    const toggle = jest.fn();

    const component = mount(<Modal title='Irelevant title' toggle={toggle}>irelevant content</Modal>);
    component.find('button.close').simulate('click');

    await wait(0); component.update();
    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
