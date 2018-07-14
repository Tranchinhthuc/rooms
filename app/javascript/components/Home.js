var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import ReactDOM from "react-dom";
import events from "./events";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {eventConvertor, timeZone} from '../constants'
import AppointmentForm from './AppointmentForm'

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      startTime: '',
      endTime: '',
    };

    this.moveEvent = this.moveEvent.bind(this);
    this.selectSlot = this.selectSlot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resizeEvent = this.resizeEvent.bind(this);
  }

  componentDidMount() {
    fetch("/schedules.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            events: eventConvertor(result),
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
    const myRequest = new Request('/schedules/' + event.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: moment(start).format("YYYY/MM/DD HH:mm"),
        end_time: moment(end).format("YYYY/MM/DD HH:mm"), time_zone: timeZone})
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.events
          console.log('MOVE', result)
          let index = arr.map((e) => e.id).indexOf(result.id);
          arr[index] = result
          this.setState({
            events: eventConvertor(arr),
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
      endTime: slotInfo.end
    });
    $('#appointment-form').modal('toggle');
    console.log(
      `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        `\nend: ${slotInfo.end.toLocaleString()}` +
        `\naction: ${slotInfo.action}`
    )
  }

  moveEvent({ event, start, end }) {
      const myRequest = new Request('/schedules/' + event.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Operator-Token': this.props.apiToken
        },
        body: JSON.stringify({start_time: moment(start).format("YYYY/MM/DD HH:mm"),
          end_time: moment(end).format("YYYY/MM/DD HH:mm"), time_zone: timeZone})
      })

      fetch(myRequest)
        .then(res => res.json())
        .then(
          (result) => {
            let arr = this.state.events
            console.log('MOVE', result)
            let index = arr.map((e) => e.id).indexOf(result.id);
            arr[index] = result
            this.setState({
              events: eventConvertor(arr),
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

  handleSubmit(title, startTime, endTime, timeZone) {
    const myRequest = new Request('/schedules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify({start_time: startTime, end_time: endTime, title: title, time_zone: timeZone })
    })

    fetch(myRequest)
      .then(res => res.json())
      .then(
        (result) => {
          let arr = this.state.events
          console.log('result', result)
          if(result.errors){
            this.setState({ errorMessage: "Start time should be less than end time" })
            return
          }
          arr.push(result)
          this.setState({
            events: eventConvertor(arr),
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
    console.log('Events', this.state.endTime)
    return (
      <React.Fragment>
        <AppointmentForm endTime={this.state.endTime}
          startTime={this.state.startTime}
          handleSubmit={this.handleSubmit} />
        <DragAndDropCalendar
          selectable
          resizable
          step={15}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onEventResize={this.resizeEvent}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.selectSlot}
        />
      </React.Fragment>
    );
  }
}

const Calendar = DragDropContext(HTML5Backend)(Dnd);
export default Calendar
