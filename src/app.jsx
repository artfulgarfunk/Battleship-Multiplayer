import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import Cell from './components/cell.jsx';
import ShipBoard from './components/shipBoard.jsx';

const contentNode = document.getElementById('contents');
const component = <ShipBoard /> ;
ReactDOM.render(component, contentNode);
