import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

import Game from '../src/components/game.jsx'
import ShipBoard from '../src/components/shipBoard.jsx';
import AttackBoard from '../src/components/attackBoard.jsx';
import Cell from '../src/components/cell.jsx';

describe('<Game />', () => {
  it('renders 2 player shipBoards, 2 attackBoards', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(ShipBoard)).to.have.length(2);
    expect(wrapper.find(AttackBoard)).to.have.length(2);
  });
});
