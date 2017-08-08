import React from 'react';

import Cell from './cell.jsx';
import AttackBoard from './attackBoard.jsx';
import Fleet from './fleet.jsx';
import ShipBoard from './shipBoard.jsx';
import Switch from './switch.jsx';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        P1Fleet: [
          ['carrier',5,1],
          ['battleship',4,1],
          ['cruiser',3,2],
          ['destroyer',2,2],
          ['submarine',1,2]
        ],
        P2Fleet: [
          ['carrier',5,1],
          ['battleship',4,1],
          ['cruiser',3,2],
          ['destroyer',2,2],
          ['submarine',1,2]
        ],
        horizontal: true,
        currentShip: [],
        currentPlayer: 1,
        P1Map: Array(100).fill(['~', ' ']),
        P2Map: Array(100).fill(['~', ' ']),
    };
  }

  standardFleet() {
    [
      ['carrier',5,1],
      ['battleship',4,1],
      ['cruiser',3,2],
      ['destroyer',2,2],
      ['submarine',1,2]
    ]
  }

  handleClick(i) {
    // get whosever map is NOT the current player
    let changer = this.attackPlayerMap()
    let x = changer[i][0]
    changer[i] = [x,x]
    this.updateMapOnly(changer)
  }

  updateMapOnly(changer) {
    if (this.state.currentPlayer == 1) {
      this.setState({
        P2Map: changer,
      })
    } else {
      this.setState({
        P1Map: changer,
      })
    }
  }

  surroundCheck(i, ship, mapp) {
    let row = Math.floor(i/10)
    let rowEnd = Math.ceil((i + 1)/10) * 10
    let rowPlace = i - row*10
    let status = true
    if (i + ship[1] > rowEnd) status = false
    for (let j = rowPlace - 1; j < rowPlace + ship[1] + 1; j++) {
      for (let k = row - 1; k < row + 2; k++) {
        if (k < 0) k = 0
        if (k > 9) break
        let checker = k*10 + j
        if (checker < 0) checker = 0
        if (checker > 99) break
        if (mapp[checker][0] != '~') {
          status = false
        }
      }
    }
    return status
  }

  ownHandleClick(i) {
    this.state.horizontal ? this.horizontalPlace(i) : this.verticalPlace(i)
  }

  verticalPlace(i) {
    var changer = this.whichPlayerMap()
    var fleet = this.whichPlayerFleet()
    var current = this.state.currentShip
    var rotated = this.rotate(changer)
    var ri = this.rotateIndex(i)

    this.updateFleetAndMap(ri,current,rotated,fleet)
    let finalmap = this.rotate(this.rotate(this.rotate(rotated)))
    this.setFleetAndMap(finalmap, fleet)
  }

  horizontalPlace(i) {
    var changer = this.whichPlayerMap()
    var fleet = this.whichPlayerFleet()
    var current = this.state.currentShip
    this.updateFleetAndMap(i,current,changer,fleet)
    this.setFleetAndMap(changer, fleet)
  }

  updateFleetAndMap(i, currentShip, currentMap, currentFleet) {
  if (currentShip[2] > 0 && this.surroundCheck(i, currentShip, currentMap)) {
    currentFleet.forEach ((ship) => {
      if (ship[0] == currentShip[0]) ship[2] -= 1
    })
      this.cellChange(currentMap,i,currentShip)
  }
}

  cellChange(attackBoard,i,current) {
    for (var x=0; x < current[1]; x++) {
      attackBoard[i + x] = ['B', ' ']
    }
  }

  setFleetAndMap(mapp, fleet) {
    if (this.state.currentPlayer == 1) {
    this.setState({
              P1Map: mapp,
              P1Fleet: fleet
    })
  } else {
      this.setState({
                P2Map: mapp,
                P2Fleet: fleet
      })
    }
  }

  rotateIndex(i) {
    let row = Math.floor(i/10)
    let rowEnd = Math.ceil((i + 1)/10) * 10
    let rowPlace = i - row*10
    let x = (9-rowPlace) * 10 + row
    return x
  }

  rotate(attackBoard) {
    let rotated = Array(100)
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        rotated[(9-i) * 10 + j] = attackBoard[i + 10 * j]
      }
    }
    return rotated
  }

  whichPlayerMap() {
    var x = ((this.state.currentPlayer == 1) ? (this.state.P1Map) : (this.state.P2Map))
    return x
}

  attackPlayerMap() {
    var x = ((this.state.currentPlayer == 1) ? (this.state.P2Map) : (this.state.P1Map))
    return x
  }

  whichPlayerFleet() {
  var x = ((this.state.currentPlayer == 1) ? (this.state.P1Fleet) : (this.state.P2Fleet))
  return x
}

  handleFleetClick(ship) {
      this.setState({
        currentShip: ship,
      })
  }

  changeHorizontal(){
    this.setState((prevState) => {
      return {horizontal: !prevState.horizontal};
    })
  }

  displayOrientation(){
    var x = (this.state.horizontal) ? 'horizontal' : 'vertical'
    return x
  }

  switchPlayer(){
    var p = (this.state.currentPlayer == 1) ? 2 : 1
    this.setState({
      currentPlayer: p
    })
  }

  disPlayer(){
    var p = (this.state.currentPlayer == 1) ? 'Player 1' : 'Player 2'
    return p
  }

  render () {
    return (
          <div>
            <Switch status={this.disPlayer()} onSwitchClick={() => this.switchPlayer()} message=''/>
            <h2> Player 1 Map </h2>
            <ShipBoard playermap={this.state.P1Map} onBoardClick={(i) => this.ownHandleClick(i)} />
            <h2> Enemy Map (P2) </h2>
            <ShipBoard playermap={this.state.P2Map} onBoardClick={(i) => this.ownHandleClick(i)}/>
            <h2> Player 1 Fleet </h2>
            <Fleet fleet={this.state.P1Fleet} onFleetClick={(ship) => this.handleFleetClick(ship)}/>
            <Switch status={this.displayOrientation()} onSwitchClick={() => this.changeHorizontal()} message='Orientation: '/>
            <h2> Player 2 Fleet </h2>
            <Fleet fleet={this.state.P2Fleet} onFleetClick={(ship) => this.handleFleetClick(ship)}/>
            <Switch status={this.displayOrientation()} onSwitchClick={() => this.changeHorizontal()} message='Orientation: '/>
            <h2> Player 2 Map </h2>
            <AttackBoard playermap={this.state.P2Map} onBoardClick={(i) => this.handleClick(i)}/>
            <h2> Enemy Map (P1) </h2>
            <AttackBoard playermap={this.state.P1Map} onBoardClick={(i) => this.handleClick(i)}/>
          </div>
    );
  }
}
