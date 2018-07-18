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
      appointments: appointmentConvertor(this.props.appointments)
    };
  }

  render() {
    let formats = {
      dateFormat: (date, culture, localizer) => {
        let countApps = countAppointmentsInDay(appointmentConvertor(this.state.appointments), date)
        return localizer.format(date, `DD`, culture) + (countApps > 0 ? ` ${countApps} appointments` : '')
      }
    }

    return (
      <React.Fragment>
        <DragAndDropCalendar
          selectable
          resizable
          formats={formats}
          components={{ event: CustomEvent }}
          views={['month']}
          events={[]}
          defaultDate={new Date()}
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
