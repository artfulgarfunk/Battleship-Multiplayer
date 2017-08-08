import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import ShipBoard from '../src/components/shipBoard.jsx';
import Cell from '../src/components/cell.jsx';

describe('<ShipBoard />', () => {
  it('contains 100 cells', () => {
    const wrapper = shallow(<ShipBoard playermap={Array(100).fill(['~', ' '])} />);
  expect(wrapper.find(Cell)).to.have.length(100);
});
});
