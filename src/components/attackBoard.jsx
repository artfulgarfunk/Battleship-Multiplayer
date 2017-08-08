import React from 'react';

import Cell from './cell.jsx';

export default class AttackBoard extends React.Component {
  renderCell(i) {
    const cells = this.props.playermap;
      if (cells[i][1] == 'B') { var style = 'danger' }
      else if ((cells[i][1] == '~')) { var style = 'info' }
      else { var style = null};
    return <Cell style={style} status={cells[i][1]} onClick={() => this.props.onBoardClick(i)} num={i} />;
  }

  renderRow(i) {
    var arr = []
      for (var x=0; x < 10; x ++) {
        arr.push(this.renderCell(i+x))
      }
    return <div> {arr} </div>;
  }

  render () {
    var board = [];
    var stochastic = 0
      for (var i=0; i < 10; i ++) {
        board.push(this.renderRow(i+stochastic))
        stochastic += 9
      }
    return (
      <div>
        {board}
      </div>
   );
  }
};
