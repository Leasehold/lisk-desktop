import React from 'react';
import { mount } from 'enzyme';
import Renderer from './renderer';

describe('Auto logout renderer component', () => {
  const props = {
    t: v => v,
    resetTimer: jest.fn(),
    setActiveDialog: jest.fn(),
    closeDialog: jest.fn(),
    minutes: '1',
    seconds: '0',
  };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Renderer {...props} />);
  });

  it('Should render empty component', () => {
    expect(wrapper).toBeEmptyRender();
  });

  it('Should call setActiveDialog if minutes = 0 and seconds = 59', () => {
    wrapper.setProps({
      minutes: '0',
      seconds: '59',
    });
    wrapper.update();
    expect(props.setActiveDialog).toHaveBeenCalled();
  });

  it('Should call setActiveDialog if minutes = 0 and seconds = 1', () => {
    wrapper.setProps({
      minutes: '0',
      seconds: '1',
    });
    wrapper.update();
    expect(props.setActiveDialog).toHaveBeenCalled();
  });
});
