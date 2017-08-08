import React from 'react';
import Cell from './cell';
import ShipBoard from './shipBoard';
import AttackBoard from './attackBoard';

export default class Game extends React.Component {

  render () {
    return (
      <div>
        <ShipBoard />
        <ShipBoard />
        <AttackBoard />
        <AttackBoard />
      </div>
    );
  }
}
