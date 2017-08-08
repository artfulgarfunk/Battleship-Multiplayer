import React from 'react';

import Cell from './cell.jsx';

export default class attackBoard extends React.Component {
  renderCell(i) {
    return <Cell status="cell"/>;
}

  renderRow(i) {
    var arr = []
      for (var x=0; x < 10; x ++) {
        arr.push(this.renderCell(i+x))
      }
    return <div> {arr} </div>;
  }

  render () {
    var AttackBoard = [];
    var stochastic = 0
      for (var i=0; i < 10; i ++) {
        AttackBoard.push(this.renderRow(i+stochastic))
        stochastic += 9
      };
    return (
      <div>
        {AttackBoard}
      </div>
   );
  }
};
