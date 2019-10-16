import React from 'react';
import { mount } from 'enzyme';
import Delegates from './delegates';
import delegates from '../../../../../test/constants/delegates';

jest.mock('../../../../constants/monitor', () => ({ DEFAULT_LIMIT: 6 }));

describe('Delegates monitor page', () => {
  let props;
  let delegatesWithData;

  beforeEach(() => {
    props = {
      t: key => key,
      delegates: {
        isLoading: true,
        data: [],
        loadData: jest.fn(),
        clearData: jest.fn(),
        urlSearchParams: {},
      },
      filters: {
        tab: '/active',
      },
      applyFilters: jest.fn(),
    };

    delegatesWithData = {
      ...props.delegates,
      isLoading: false,
      data: delegates,
    };
  });

  it('renders a page with header', () => {
    const wrapper = mount(<Delegates {...props} />);
    expect(wrapper.find('Box header')).toIncludeText('Active delegates');
  });

  it('renders table with delegates', () => {
    const wrapper = mount(<Delegates {...props} />);
    expect(wrapper.find('.delegate-row')).toHaveLength(0);
    wrapper.setProps({ delegates: delegatesWithData });
    expect(wrapper.find('.delegate-row').hostNodes()).toHaveLength(delegates.length);
  });
});