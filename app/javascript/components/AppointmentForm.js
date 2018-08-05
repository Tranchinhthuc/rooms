import React, { Component } from 'react';
import { render } from 'react-dom';
import {dateTimeStamp} from '../lib'
import moment from "moment";
import Datetime from 'react-datetime';

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <div className="modal fade" id="appointment-form" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  {
                    this.props.resourceTitle && (
                      <p>Employee: {this.props.resourceTitle}</p>
                    )
                  }
                  <p><input value={this.props.title}
                            type="text"
                            className="form-control"
                            id="appointment-title"
                            placeholder='Add Title'
                            onChange={this.props.handleTitleChange}/>
                  </p>
                  <Datetime
                    value={this.props.selectedDate}
                    onChange={this.props.handleSelectedDateChange}
                    dateFormat="YYYY/MM/DD"
                    timeFormat={false}
                    closeOnSelect={true}
                    inputProps={{placeholder: (this.props.selectedDate || 'Date')}} />
                  <p></p>
                  <p>
                    <select style={{width: '45%', display: 'inline-block'}} className="form-control"
                            onChange={this.props.handleStartTimeChange}>
                      <option value=''>---Start Time---</option>
                      {
                        dateTimeStamp.map((time, index) => {
                          return <option
                            selected={time.timeStr===moment(this.props.start).format("HH:mm") || time.timeStr === '08:00'}
                            key={index}
                            value={time.timeStr}>{time.timeStr}
                          </option>
                        })
                      }
                    </select>

                    <span style={{margin: '0px 2px'}}>~</span>
                    <select style={{width: '45%', display: 'inline-block'}} className="form-control"
                            onChange={this.props.handleEndTimeChange}>
                      <option value=''>---End Time---</option>
                      {
                        dateTimeStamp.map((time, index) => {
                          return <option
                            selected={time.timeStr===moment(this.props.end).format("HH:mm") || time.timeStr === '08:00'}
                            key={index}
                            value={time.timeStr}>{time.timeStr}
                          </option>
                        })
                      }
                    </select>
                  </p>
                  {
                    this.props.employees && (
                      <p>
                        <select className="form-control"
                          onChange={this.props.handleEmployeeChange}>
                          <option value=''>---Employee---</option>
                          {
                            this.props.employees.map((employee, index) => {
                              return <option
                                selected={employee.name===this.props.resourceTitle}
                                key={index}
                                value={employee.id}>{employee.name}
                              </option>
                            })
                          }
                        </select>
                      </p>
                    )
                  }
                  <p>
                    <input type="checkbox"
                            name="weekly"
                            id="weekly"
                            onChange={this.props.handleWeeklyChange}
                            checked={this.props.weekly} />
                    <label htmlFor='weekly' style={{marginLeft: '10px'}}>weekly?</label>
                  </p>
                  <p>
                    <button
                      style={{margin: '0px 2px'}}
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.props.handleSubmit}
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
