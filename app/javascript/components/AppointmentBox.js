import React, { Component } from 'react';
import { render } from 'react-dom';
import Rnd from 'react-rnd';
import {dateTimeStamp, timeShotHeight} from '../constants'

const style = {
  color: 'white',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'left',
  border: 'solid 1px #ddd',
  background: '#3A82EA',
  display: 'block',
};

export default class AppointmentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width,
      height: this.props.height,
      x: this.props.x,
      y: (this.props.hourStartTime * 4 + this.props.minuteStartTime / 15) * timeShotHeight,
      startTime: '',
      endTime: '',
    }
    this.handleResize = this.handleResize.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
    this.handleResizeStop = this.handleResizeStop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDragStop(e, d) {
    this.setState({ y: d.y })
    let minStart = parseInt((this.state.y)*15.0/timeShotHeight)
    let minEnd = minStart + parseInt(this.state.height)*15.0/timeShotHeight
    let startTime = `${parseInt(minStart/60)}:${parseInt(minStart) - parseInt(minStart/60)*60}`
    let endTime = `${parseInt(minEnd/60)}:${parseInt(minEnd) - parseInt(minEnd/60)*60}`

    this.props.handleUpdate(this.props.id, startTime, endTime);
  }

  handleResize(e, direction, ref, delta, position) {
    this.setState({
      width: ref.style.width,
      height: ref.style.height,
      y: this.state.y,
    });
  }

  handleResizeStop(e, direction, ref, delta, position) {
    this.setState({
      width: ref.style.width,
      height: ref.style.height,
      y: this.state.y,
    });
    let minStart = parseInt((this.state.y)*15.0/timeShotHeight)
    let minEnd = minStart + parseInt(this.state.height)*15.0/timeShotHeight
    let startTime = `${parseInt(minStart/60)}:${parseInt(minStart) - parseInt(minStart/60)*60}`
    let endTime = `${parseInt(minEnd/60)}:${parseInt(minEnd) - parseInt(minEnd/60)*60}`
    this.props.handleUpdate(this.props.id, startTime, endTime);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.handleDelete(this.props.id);
  }

  render() {
    let minStart = parseInt((this.state.y)*15.0/timeShotHeight)
    let minEnd = minStart + parseInt(this.state.height)*15.0/timeShotHeight
    let startTime = `${parseInt(minStart/60)}:${parseInt(minStart) - parseInt(minStart/60)*60}`
    let endTime = `${parseInt(minEnd/60)}:${parseInt(minEnd) - parseInt(minEnd/60)*60}`
    return (
      <Rnd
        style={style}
        size={{ width: this.state.width, height: this.state.height }}
        position={{ x: this.props.x, y: Math.max(...[0, this.state.y]) }}
        enableResizing={{bottom: true}}
        moveaxis='y'
        onDragStop={this.handleDragStop}
        onResize={this.handleResize}
        onResizeStop={this.handleResizeStop}
      >
          <p style={{margin: 0}}>
            {this.props.title}
            <a style={{float: 'right'}} href='#' onClick={this.handleDelete} className='btn btn-danger'> X</a>
          </p>
          <p style={{margin: 0}}>
            {startTime}
            --->
            {endTime}
          </p>
      </Rnd>
    );
  }
}
