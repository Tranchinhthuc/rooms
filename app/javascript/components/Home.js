var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {appointmentConvertor, timeZone} from '../lib'
import AppointmentForm from './AppointmentForm'
import CustomEvent from './CustomEvent';


BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      employees: [],
      resourceId: '',
      startTime: '',
      endTime: '',
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);
  }

  componentDidMount() {
    fetch("/appointments.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            appointments: appointmentConvertor(result),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    fetch("/employees.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            employees: result,
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
      startTime: slotInfo.start,
      endTime: slotInfo.end,
      resourceId: slotInfo.resourceId,
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

  handleSubmit(title, startTime, endTime, resourceId, timeZone) {
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
          arr.push(result)
          this.setState({
            appointments: appointmentConvertor(arr),
            errorMessage: '',
            employees: this.state.employees.map((e) => {
              if(result.resourceId == e.id){ e.appointmentCount = e.appointmentCount + 1 }
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
        <AppointmentForm endTime={this.state.endTime}
          startTime={this.state.startTime}
          resourceId={this.state.resourceId}
          resourceTitle={(indexEmployee >= 0) && this.state.employees[indexEmployee].name}
          handleSubmit={this.handleSubmit} />
        <DragAndDropCalendar
          selectable
          resizable
          step={15}
          components={{ event: CustomEvent }}
          views={['day', 'week']}
          events={this.state.appointments}
          onEventDrop={this.moveEvent}
          defaultView={BigCalendar.Views.DAY}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onEventResize={this.resizeEvent}
          onSelectEvent={appointment => alert(appointment.title)}
          onSelectSlot={this.selectSlot}
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
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
