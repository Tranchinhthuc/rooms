var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {appointmentConvertor, timeZone, countAppointmentsInDay} from '../lib'
import AppointmentForm from './AppointmentForm'
import CustomEvent from './CustomEvent';


BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: appointmentConvertor(this.props.appointments),
      employees: this.props.employees,
      statistic: this.props.statistic,
      resourceId: '',
      selectedDate: moment().format('YYYY/MM/DD'),
      start: moment(),
      end: moment(),
      title: '',
      weekly: false,
      errorMessage: ''
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);
  }

  resizeEvent(resizeType, { event, start, end }){
    const myRequest = new Request('/appointments/' + event.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: moment(start).format("YYYY/MM/DD HH:mm"),
        end_time: moment(end).format("YYYY/MM/DD HH:mm"), time_zone: timeZone,
        user_id: this.props.currentUser && this.props.currentUser.id})
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.appointments
          let index = arr.map((e) => e.id).indexOf(result.id);
          arr[index] = result
          this.setState({
            appointments: appointmentConvertor(arr),
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
  };

  selectSlot(slotInfo){
    this.setState({
      start: slotInfo.start,
      end: slotInfo.end,
      resourceId: slotInfo.resourceId,
      selectedDate: moment(slotInfo.start).format("YYYY/MM/DD")
    });
    $('#appointment-form').modal('toggle');
  }

  moveEvent({ event, start, end }) {
      const myRequest = new Request('/appointments/' + event.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Operator-Token': this.props.apiToken
        },
        body: JSON.stringify({start_time: moment(start).format("YYYY/MM/DD HH:mm"),
          end_time: moment(end).format("YYYY/MM/DD HH:mm"),
          time_zone: timeZone, user_id: this.props.currentUser && this.props.currentUser.id})
      })

      fetch(myRequest)
        .then(res => res.json())
        .then(
          (result) => {
            let arr = this.state.appointments
            let index = arr.map((e) => e.id).indexOf(result.id);
            arr[index] = result
            this.setState({
              appointments: appointmentConvertor(arr),
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

  handleSelectedDateChange(e) {
    this.setState({
      selectedDate: e.format('YYYY/MM/DD'),
      start: e.format('YYYY/MM/DD') + ' ' + moment(this.state.start).format('HH:mm'),
      end: e.format('YYYY/MM/DD') + ' ' + moment(this.state.end).format('HH:mm'),
    });
  }

  handleStartTimeChange(e) {
    this.setState({start: this.state.selectedDate + ' ' + e.target.value});
  }

  handleEndTimeChange(e) {
    this.setState({end: this.state.selectedDate + ' ' + e.target.value});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleEmployeeChange(e) {
    this.setState({resourceId: e.target.value});
  }

  handleWeeklyChange(e) {
    this.setState({weekly: !this.state.weekly});
  }

  handleAppointmentInprogressClick(e){
    const myRequest = new Request('/appointments/in_progress', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      }
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            appointments: appointmentConvertor(result),
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

  handleSubmit() {
    let title = this.state.title
    let weekly = this.state.weekly
    let startTime = moment(this.state.start).format("YYYY/MM/DD HH:mm")
    let endTime = moment(this.state.end).format("YYYY/MM/DD HH:mm")
    let resourceId = this.state.resourceId
    let timeZone = new Date().getTimezoneOffset()/60
    const myRequest = new Request('/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: startTime, end_time: endTime, title: title,
        time_zone: timeZone,
        user_id: this.props.currentUser && this.props.currentUser.id,
        resource_id: resourceId,
        weekly: weekly
      })
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.appointments
          if(result.errors){
            this.setState({ errorMessage: "Start time should be less than end time" })
            return
          }
          this.setState({
            statistic: result.statistic,
            appointments: appointmentConvertor(result.appointments),
            errorMessage: '',
            employees: this.state.employees.map((e) => {
              if(result.appointment.resourceId == e.id){ e.appointmentCount = e.appointmentCount + 1 }
              return e
            })
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

  onSelectEvent(appointment){ 
    let r = window.confirm("Do you want to delete appoitment " + appointment.title + "?");
    if (r == true) {
      const myRequest = new Request(`/appointments/${appointment.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Operator-Token': this.props.apiToken
        }
      })

      fetch(myRequest)
        .then(res => res.json())
        .then(
          (result) => {
            window.location.reload();
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  handleFilterEmployeeChange(e) {
    const myRequest = new Request('/appointments?employee_id=' + e.target.value, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      }
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            appointments: appointmentConvertor(result),
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

  render() {
    console.log(this.state.appointments)
    let resourceMap = this.state.employees.map((em) => {
      return { resourceId: em.id, resourceTitle: `${em.name}(${em.appointmentCount} appointments)` }
    })

    let indexEmployee = this.state.employees.map((e) => e.id).indexOf(this.state.resourceId);
    let formats = {
      dayFormat: (date, culture, localizer) => localizer.format(date, `DD dddd`, culture) + ` (${countAppointmentsInDay(appointmentConvertor(this.state.appointments), date)})`
    }

    let statistic = this.state.statistic
    return (
      <React.Fragment>
        <p className='error'>{this.state.errorMessage}</p>
        <button className='btn btn-primary week-add-new-appointment'
                onClick={()=>{$('#appointment-form').modal('toggle')}}>Add New Appointment</button>
        <AppointmentForm end={this.state.end}
          start={this.state.start}
          weekly={this.state.weekly}
          selectedDate={this.state.selectedDate}
          resourceId={this.state.resourceId}
          resourceTitle={(indexEmployee >= 0) && this.state.employees[indexEmployee].name}
          employees={this.state.employees}
          handleSubmit={this.handleSubmit}
          handleSelectedDateChange={this.handleSelectedDateChange.bind(this)}
          handleStartTimeChange={this.handleStartTimeChange.bind(this)}
          handleEndTimeChange={this.handleEndTimeChange.bind(this)}
          handleTitleChange={this.handleTitleChange.bind(this)}
          handleEmployeeChange={this.handleEmployeeChange.bind(this)}
          handleWeeklyChange={this.handleWeeklyChange.bind(this)}/>
        <ul className='no-print'>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {statistic.total_appointments_of_this_week} Appuntamenti totali questa settimana
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {statistic.remain_appointments_of_this_week} Appuntamenti rimanenti questa settimana
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {statistic.total_appointments_of_this_month} Appuntamenti totali questo mese
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {statistic.remain_appointments_of_this_month} Appuntamenti rimanenti questo mese
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {statistic.total_appointments_of_this_year} Appuntamenti totali quest'anno
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {statistic.total_appointments_of_today} Al Momento non ci sono Appuntamenti.
          </li>
        </ul>
        <select className="form-control filter-by-employee"
          onChange={this.handleFilterEmployeeChange.bind(this)}>
          <option value=''>---Employee---</option>
          {
            this.state.employees.map((employee, index) => {
              return <option
                key={index}
                value={employee.id}>{employee.name}
              </option>
            })
          }
        </select>
        <DragAndDropCalendar
          selectable
          resizable
          step={15}
          formats={formats}
          components={{ event: CustomEvent }}
          views={['week']}
          events={this.state.appointments}
          onEventDrop={this.moveEvent}
          onNavigate={this.onNavigate}
          onSelectEvent={this.onSelectEvent}
          defaultView={BigCalendar.Views.WEEK}
          defaultDate={new Date()}
          onEventResize={this.resizeEvent}
          onSelectSlot={this.selectSlot}
          min={new Date(1970, 7, 1, 8, 0)}
          max={new Date(1970, 7, 1, 20, 0)}
        />
      </React.Fragment>
    );
  }
}

// Home.propTypes = {
//   current_user: PropTypes.Object
// };

const Calendar = DragDropContext(HTML5Backend)(Dnd);
export default Calendar
