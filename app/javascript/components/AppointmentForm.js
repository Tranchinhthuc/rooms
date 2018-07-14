import React, { Component } from 'react';
import { render } from 'react-dom';
import {dateTimeStamp, timeShotHeight} from '../constants'

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {startTime: '', endTime: '', title: ''};
  }

  handleStartTimeChange(e) {
    console.log('startTime', e.target.value)
    this.setState({startTime: e.target.value});
  }

  handleEndTimeChange(e) {
    this.setState({endTime: e.target.value});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleSubmit(e) {
    this.props.handleSubmit(this.state.title, this.state.startTime, this.state.endTime);
  }
  render() {
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
                  <p>
                    <select style={{width: '45%', display: 'inline-block'}} className="form-control" onChange={this.handleStartTimeChange}>
                      <option value=''>---Start Time---</option>
                      {
                        dateTimeStamp.map((time, index) => {
                          return <option key={index} value={time.timeStr}>{time.timeStr}</option>
                        })
                      }
                    </select>

                    <span style={{margin: '0px 2px'}}>~</span>
                    <select style={{width: '45%', display: 'inline-block'}} className="form-control" onChange={this.handleEndTimeChange}>
                      <option value=''>---End Time---</option>
                      {
                        dateTimeStamp.map((time, index) => {
                          return <option key={index} value={time.timeStr}>{time.timeStr}</option>
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
