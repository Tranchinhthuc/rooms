import React from "react"
import PropTypes from "prop-types"
import AppointmentBox from './AppointmentBox'
import TimeShot from './TimeShot'
import AppointmentForm from './AppointmentForm'
import {dateTimeStamp, timeShotHeight} from '../constants'

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      errorMessage: '',
      error: null,
      isLoaded: false,
      schedules: []
    };
  }

  componentDidMount() {
    fetch("/schedules.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            schedules: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleSubmit(title, startTime, endTime) {
    const myRequest = new Request('/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: startTime, end_time: endTime, title: title })
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.schedules
          console.log('result', result)
          if(result.errors){
            this.setState({ errorMessage: "Start time should be less than end time" })
            return
          }
          arr.push(result)
          this.setState({
            schedules: arr,
            errorMessage: '',
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleUpdate(id, startTime, endTime) {
    const myRequest = new Request('/schedules/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: startTime, end_time: endTime })
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.schedules
          let index = arr.map((e) => e.id).indexOf(result.id);
          arr[index] = result
          this.setState({
            schedules: arr,
            errorMessage: '',
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleDelete(id, startTime, endTime) {
    const myRequest = new Request('/schedules/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: startTime, end_time: endTime })
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.schedules
          let index = arr.map((e) => e.id).indexOf(result.id);
          arr.splice(index, 1)
          this.setState({
            schedules: arr,
            errorMessage: '',
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render () {
    console.log('dateTimeStamp', dateTimeStamp)
    return (
      <React.Fragment>
        <div className='container'>
          {this.state.errorMessage && (<span style={{color: 'red'}}>{this.state.errorMessage}</span>)}
          <AppointmentForm handleSubmit={this.handleSubmit} />
          <div className='row'>
            <div className='col-sm-12'>
              {
                dateTimeStamp.map((time, index) => {
                  return <TimeShot key={index} startTime={time.timeStr} />
                })
              }
              {console.log('schedules', this.state.schedules)}
              {
                this.state.schedules.map((schedule) => {
                  return <AppointmentBox key={schedule.id} width={300}
                    id={schedule.id}
                    height={schedule.duration * timeShotHeight / 15} x={100}
                    hourStartTime={schedule.hour_start_time}
                    minuteStartTime={schedule.minute_start_time}
                    hourEndTime={schedule.hour_end_time}
                    minuteEndTime={schedule.minute_end_time}
                    title={schedule.title}
                    handleUpdate={this.handleUpdate}
                    handleDelete={this.handleDelete} />
                })
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
