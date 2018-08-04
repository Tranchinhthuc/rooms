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
      employees: this.props.employees.map((e) => {
                    e.appointmentCount = countAppointmentsInDay(appointmentConvertor(e.appointments), new Date())
                    return e
                  }),
      currentDay: new Date(),
      resourceId: '',
      startTime: '',
      endTime: '',
      selectedDate: moment().format('YYYY/MM/DD'),
      start: '',
      end: '',
      title: ''
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
          console.log('MOVE', result)
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
    console.log(
      `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        `\nend: ${slotInfo.end.toLocaleString()}` +
        `\naction: ${slotInfo.action}` +
        `\nresourceId: ${slotInfo.resourceId}`
    )
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
            console.log('MOVE', result)
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

  handleSubmit() {
    let title = this.state.title
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
        resource_id: resourceId
      })
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.appointments
          console.log('result', result)
          if(result.errors){
            this.setState({ errorMessage: "Start time should be less than end time" })
            return
          }
          arr.push(result.appointment)
          this.setState({
            appointments: appointmentConvertor(arr),
            errorMessage: '',
            employees: this.state.employees.map((e) => {
              if(result.appointment.resourceId == e.id){
                e.appointmentCount = 1 + e.appointmentCount
              }
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

  render() {
    let resourceMap = this.state.employees.map((em) => {
      return { resourceId: em.id, resourceTitle: `${em.name}(${em.appointmentCount} appointments)` }
    })
    let indexEmployee = this.state.employees.map((e) => e.id).indexOf(this.state.resourceId);

    return (
      <React.Fragment>
          <AppointmentForm end={this.state.end}
            start={this.state.start}
            selectedDate={this.state.selectedDate}
            resourceId={this.state.resourceId}
            resourceTitle={(indexEmployee >= 0) && this.state.employees[indexEmployee].name}
            employees={this.state.employees}
            handleSubmit={this.handleSubmit}
            handleSelectedDateChange={this.handleSelectedDateChange.bind(this)}
            handleStartTimeChange={this.handleStartTimeChange.bind(this)}
            handleEndTimeChange={this.handleEndTimeChange.bind(this)}
            handleTitleChange={this.handleTitleChange.bind(this)}
            handleEmployeeChange={this.handleEmployeeChange.bind(this)}/>
        <DragAndDropCalendar
          selectable
          resizable
          step={15}
          components={{ event: CustomEvent }}
          views={['day']}
          events={this.state.appointments}
          onEventDrop={this.moveEvent}
          defaultView={BigCalendar.Views.DAY}
          defaultDate={new Date()}
          onEventResize={this.resizeEvent}
          onSelectEvent={appointment => alert(appointment.title)}
          onSelectSlot={this.selectSlot}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          min={new Date(1970, 7, 1, 8, 0)}
          max={new Date(1970, 7, 1, 20, 0)}
          onNavigate={(day) => {
            console.log('DAY', this.state.currentDay)
             this.setState({
               employees: this.state.employees.map((e) => {
                            e.appointmentCount = countAppointmentsInDay(appointmentConvertor(e.appointments), day)
                            return e
                          }),
               currentDay: day
             })}}
        />
      </React.Fragment>
    );
  }
}

const Calendar = DragDropContext(HTML5Backend)(Dnd);
export default Calendar
