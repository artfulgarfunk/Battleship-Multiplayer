import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import AttackBoard from '../src/components/attackBoard.jsx';
import Cell from '../src/components/cell.jsx';

describe('<AttackBoard />', () => {
  it('contains 100 cells', () => {
  const wrapper = shallow(<AttackBoard />);
  expect(wrapper.find(Cell)).to.have.length(100);
});
});
