import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import Cell from '../src/components/cell.jsx';
import ShipBoard from '../src/components/shipBoard.jsx';

describe('<ShipBoard />', () => {
  it('contains 100 cells', () => {
  const wrapper = shallow(<ShipBoard />);
  expect(wrapper.find(Cell)).to.have.length(100);
});
});
