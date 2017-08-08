import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Switch from '../src/components/switch.jsx';

describe('<Switch />', () => {
  it('allows setting props', () => {
    const wrapper = mount(<Switch con='sea-hit' />);
    expect(wrapper.props().con).to.equal('sea-hit');
    wrapper.setProps({val: 'hit'});
    expect(wrapper.props().val).to.equal('hit')
  });

  it ('contains a button', () => {
    const wrapper = shallow(<Switch />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = mount(<Switch status={null} onSwitchClick={onClick} />);
    wrapper.find('button').simulate('click');
    expect(onClick.calledOnce).to.equal(true);
  });

  it('displays the value of a prop', () => {
    const wrapper = mount(<Switch status='This is a hit' />);
    expect(wrapper.text()).to.contain('This is a hit');
  });

})
