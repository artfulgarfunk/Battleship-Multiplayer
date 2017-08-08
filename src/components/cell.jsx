import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default function Cell(props) {

  return (
    <div style={{width:'50px', height:'50px', display:'inline-block'}}>
      <button class='btn-block' style={{width:'100%', height:'100%'}} bsStyle={props.style} onClick={() => props.onClick()}>
        {props.status}
      </button>
    </div>
  );
}
