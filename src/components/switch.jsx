import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default function Switch(props) {
  return (
    <div>
      <h2> {props.message} </h2>
      <button onClick={() => props.onSwitchClick()}>
        <h2> {props.status} </h2>
      </button>
    </div>
  );
}
