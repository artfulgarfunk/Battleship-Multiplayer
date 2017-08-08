import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Cell from './components/cell.jsx';
import ShipBoard from './components/shipBoard.jsx';
import AttackBoard from './components/attackBoard.jsx';
import Switch from './components/switch.jsx';
import Fleet from './components/fleet.jsx';
import Game from './components/game.jsx';

const contentNode = document.getElementById('contents');
const component = <Game /> ;
ReactDOM.render(component, contentNode);
