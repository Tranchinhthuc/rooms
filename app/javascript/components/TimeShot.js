import React, { Component } from 'react';
import { render } from 'react-dom';
import {timeShotHeight} from '../constants'
const style = {
  height: `${timeShotHeight}px`,
  borderBottom: '2px solid #e1ece1',
};

export default class TimeShot extends Component {
  render() {
    return (
      <div data-toggle="modal" data-target="#appointment-form" style={style}>
        <p>{this.props.startTime}</p>
      </div>
    );
  }
}
