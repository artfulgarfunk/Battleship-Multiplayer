import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
// components
import Game from '../src/components/game.jsx';
import Cell from '../src/components/cell.jsx';
import ShipBoard from '../src/components/shipBoard.jsx';
import Fleet from '../src/components/fleet.jsx';
import AttackBoard from '../src/components/attackBoard.jsx';
import Switch from '../src/components/switch.jsx';


describe('<Game />', function () {
  it('renders 2 player boards, 2 opponent boards,2 fleets & 3 switches(orientation and turn)', () => {
    const wrapper = shallow(<Game />);
    expect(wrapper.find(AttackBoard)).to.have.length(2);
    expect(wrapper.find(ShipBoard)).to.have.length(2);
    expect(wrapper.find(Fleet)).to.have.length(2);
    expect(wrapper.find(Switch)).to.have.length(3);
  });

  it('renders a total of 442 Cell components', () => {
    const wrapper = mount(<Game />);
    expect(wrapper.find(Cell)).to.have.length(442);
  });

  it('with default values of "~"/" " for each cell', () => {
    const wrapper = mount(<Game />);
    wrapper.state('P1Map').forEach(function(element) {
    expect(element[0]).to.equal('~')
    expect(element[1]).to.equal(' ')
    });
  });

  it('it has a two fleets with 5 types of ships', () => {
    const wrapper = shallow(<Game />);
    const fleet = wrapper.state('P1Fleet');
    expect(fleet).to.have.length(5)
    const fleet2 = wrapper.state('P2Fleet');
    expect(fleet2).to.have.length(5)
  });

  it('each has a 5-cell aircraft carrier', () => {
    const wrapper = shallow(<Game />);
    const fleet = wrapper.state('P1Fleet');
    expect(fleet[0]).to.eql(['carrier',5,1])
  });

  it('each has a 4-cell Battleship', () => {
    const wrapper = shallow(<Game />);
    const fleet = wrapper.state('P1Fleet');
    expect(fleet[1]).to.eql(['battleship',4,1])
  });

  it('each has a 3-cell cruiser', () => {
    const wrapper = shallow(<Game />);
    const fleet = wrapper.state('P1Fleet');
    expect(fleet[2]).to.eql(['cruiser',3,2])
  });

  it('each has two 2-cell destroyers', () => {
    const wrapper = shallow(<Game />);
    const fleet = wrapper.state('P1Fleet');
    expect(fleet[3]).to.eql(['destroyer',2,2])
  });

  it('each has two 1-cell submarines', () => {
    const wrapper = shallow(<Game />);
    const fleet = wrapper.state('P1Fleet');
    expect(fleet[4]).to.eql(['submarine',1,2])
  });

  it('clicking on a ship in the fleet selects that ship for the board', () => {
    const wrapper = shallow(<Game />);
    wrapper.instance().handleFleetClick(['carrier',5,1])
    expect(wrapper.state('currentShip')).to.eql(['carrier',5,1])
  });

  it('then clicking on own board puts down the ship', () => {
    const wrapper = shallow(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().ownHandleClick(0)
    for (let x = 0; x < boat[1]; x++) {
      expect(wrapper.state('P1Map')[x][0]).to.eql("B")
    }
  });

  it('but not if it went overboard', () => {
    const wrapper = shallow(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().ownHandleClick(8)
    for (let x = 8; x < 8 + boat[1]; x++) {
      expect(wrapper.state('P1Map')[x][0]).to.eql("~")
    }
  });

  it('and not if it were too close to another ship (same line)', () => {
    const wrapper = shallow(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().ownHandleClick(0)
    const otherBoat = ['cruiser',3,2]
    wrapper.instance().handleFleetClick(otherBoat)
    wrapper.instance().ownHandleClick(5)
    for (let x = 5; x < 5 + otherBoat[1]; x++) {
      expect(wrapper.state('P1Map')[x][0]).to.eql("~")
    }
  });

  it('and not if it were too close to another ship (adjacent line)', () => {
    const wrapper = shallow(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().ownHandleClick(95)
    const otherBoat = ['cruiser',3,2]
    wrapper.instance().handleFleetClick(otherBoat)
    wrapper.instance().ownHandleClick(82)
    for (let x = 82; x < 82 + otherBoat[1]; x++) {
      expect(wrapper.state('P1Map')[x][0]).to.eql("~")
    }
  });

  it('and takes it out of the fleet', () => {
    const wrapper = mount(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().ownHandleClick(0)
    expect(wrapper.state('P1Fleet')[0]).to.eql(['carrier',5,0])
  });

  it('and the opponent can fire and see if they\'ve hit or missed', () => {
    const wrapper = shallow(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().ownHandleClick(0)
    const asSeenByOpponent = wrapper.find(AttackBoard).nodes[1].props.playermap
    for (let x = 0; x < boat[1]; x++) {
      expect(asSeenByOpponent[x]).to.eql(['B', ' '])
      wrapper.instance().handleClick(x)
      expect(asSeenByOpponent[x]).to.eql(['B', ' '])
    }
    wrapper.instance().handleClick(5)
    expect(asSeenByOpponent[5]).to.eql(['~', ' '])
  });

  it('player can click button to change orientation then place ship vertically', () => {
    const wrapper = shallow(<Game />);
    const boat = ['carrier',5,1]
    wrapper.instance().handleFleetClick(boat)
    wrapper.instance().changeHorizontal()
    wrapper.instance().ownHandleClick(0)
    for (let x = 0; x < boat[1]; x++) {
      expect(wrapper.state('P1Map')[x*10][0]).to.eql("B")
    }
  });

  it('ends the game when a player\'s entire fleet has been hit', () => {
    const wrapper = mount(<Game />);
  });
})
