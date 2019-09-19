import React from 'react';
import { shallow } from 'enzyme';

import PaginationLinks from '../../../components/shared/PaginationLinks';

describe('PaginationLinks', () => {
  it('renders pagination links with current page having className .active', () => {
    const component = shallow(
      <PaginationLinks
        page={2}
        totalPages={4}
      />
    );

    expect(component.html()).toBe(
      shallow(
        <ul className='pagination'>
          <li className='page-item '>
            <a className='page-link'>1</a>
          </li>
          <li className='page-item active'>
            <a className='page-link'>2</a>
          </li>
          <li className='page-item '>
            <a className='page-link'>3</a>
          </li>
          <li className='page-item '>
            <a className='page-link'>4</a>
          </li>
        </ul>
      ).html()
    );
  });

  it('calls the passed in onPageClick function with the correct page number', () => {
    const onPageClick = jest.fn();

    const component = shallow(
      <PaginationLinks
        page={1}
        totalPages={3}
        onPageClick={onPageClick}
      />
    );

    component.find('a').at(1).simulate('click');
    expect(onPageClick).toHaveBeenCalledWith(2);
  });

  describe('auto hide', () => {
    it('autoHide is true: hides if there is only one page', () => {
      const component = shallow(
        <PaginationLinks
          page={1}
          totalPages={1}
          autoHide
        />
      );

      expect(component.html()).toBe('')
    });

    it('autoHide is false: does not hide if there is only one page', () => {
      const component = shallow(
        <PaginationLinks
          page={1}
          totalPages={1}
        />
      );

      expect(component.html()).toBe(
        shallow(
          <ul className='pagination'>
            <li className='page-item active'>
              <a className='page-link'>1</a>
            </li>
          </ul>
        ).html()
      );
    });
  });
});
