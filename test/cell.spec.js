import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Cell from '../src/components/cell.jsx';

describe('<Cell />', () => {
  it('allows setting props', () => {
    const wrapper = mount(<Cell con='sea-hit' />);
    expect(wrapper.props().con).to.equal('sea-hit');
    wrapper.setProps({val: 'hit'});
    expect(wrapper.props().val).to.equal('hit')
  });

  it ('contains a button html div', () => {
    const wrapper = shallow(<Cell />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Cell status={null} onClick={onClick} />);
    wrapper.find('button').simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });

  it('displays the value of a prop', () => {
    const wrapper = mount(<Cell status='This is a hit' />);
    expect(wrapper.text()).to.contain('This is a hit');
  });

})
