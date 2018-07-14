import React, { Component } from 'react';
import { render } from 'react-dom';
import {dateTimeStamp, timeShotHeight, timeZone} from '../constants'
import moment from "moment";

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {start: this.props.startTime, end: this.props.endTime, title: ''};
  }

  handleStartTimeChange(e) {
    this.setState({start: e.target.value});
  }

  handleEndTimeChange(e) {
    console.log('SELECT', e.target.value)
    this.setState({end: e.target.value});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit(e) {
    let start = (this.state.start && `${moment(this.props.startTime).format("YYYY/MM/DD")} ${this.state.start}` ) ||
      moment(this.props.startTime).format("YYYY/MM/DD HH:mm")
    let end = (this.state.end && `${moment(this.props.startTime).format("YYYY/MM/DD")} ${this.state.end}` ) ||
      moment(this.props.endTime).format("YYYY/MM/DD HH:mm")
    this.props.handleSubmit(this.state.title, start, end, new Date().getTimezoneOffset()/60);
    console.log('TIME', timeZone);
  }
  render() {
    console.log('FORMMM', this.state.endTime)
    return (
        <div>
          <div className="modal fade" id="appointment-form" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <p><input type="text"
                            className="form-control"
                            id="appointment-title"
                            placeholder='Add Title'
                            onChange={this.handleTitleChange}/>
                  </p>
                  <p>Date: {moment(this.props.startTime).format("YYYY/MM/DD")}</p>
                  <p>
                    <select style={{width: '45%', display: 'inline-block'}} className="form-control" onChange={this.handleStartTimeChange}>
                      <option value=''>---Start Time---</option>
                      {
                        dateTimeStamp.map((time, index) => {
                          return <option
                            selected={time.timeStr===moment(this.props.startTime).format("HH:mm")}
                            key={index}
                            value={time.timeStr}>{time.timeStr}
                          </option>
                        })
                      }
                    </select>

                    <span style={{margin: '0px 2px'}}>~</span>
                    <select style={{width: '45%', display: 'inline-block'}} className="form-control" onChange={this.handleEndTimeChange}>
                      <option value=''>---End Time---</option>
                      {
                        dateTimeStamp.map((time, index) => {
                          return <option
                            selected={time.timeStr===moment(this.props.endTime).format("HH:mm")}
                            key={index}
                            value={time.timeStr}>{time.timeStr}
                          </option>
                        })
                      }
                    </select>
                  </p>
                  <p>
                    <button
                      style={{margin: '0px 2px'}}
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.handleSubmit}
                    >Save
                    </button>
                    <button style={{margin: '0px 2px'}} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
