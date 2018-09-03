var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import ReactDOM from "react-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import  "moment/locale/it";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {appointmentConvertor, timeZone, countAppointmentsInDay} from '../lib'

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: appointmentConvertor(this.props.appointments)
    };
  }

  onNavigate() {
    $( document ).ready(function() {
      $('.rbc-row-content .rbc-date-cell a').each(function (index, elem) {
        let elem_text = $(elem).text()
        $(elem).html(elem_text.replace('_', ' ').replace(' ', '<br>'))
      })
    })
  }

  componentDidMount() {
    $( document ).ready(function() {
      $('.rbc-date-cell a').each(function (index, elem) {
        let elem_text = $(elem).text()
        $(elem).html(elem_text.replace('_', ' ').replace(' ', '<br>'))
      })
    })
  }

  render() {
    let formats = {
      dateFormat: (date, culture, localizer) => {
        let countApps = countAppointmentsInDay(appointmentConvertor(this.state.appointments), date)
        return localizer.format(date, `DD`, culture) + (countApps > 0 ? ` ${countApps}_appointments` : '')
      }
    }

    return (
      <React.Fragment>
      <ul className='no-print'>

          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {this.props.statistic.total_appointments_of_this_month} Appuntamenti totali questo mese
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {this.props.statistic.remain_appointments_of_this_month} Appuntamenti rimanenti questo mese
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {this.props.statistic.total_appointments_of_this_year} Appuntamenti totali questanno
          </li>
          <li style={{textAlign: 'center', listStyleType: 'none'}}>
            {this.props.statistic.total_appointments_of_today} Al Momento non ci sono Appuntamenti.
          </li>
        </ul>

        <DragAndDropCalendar
          selectable
          resizable
          formats={formats}
          onNavigate={this.onNavigate}
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

const Calendar = DragDropContext(HTML5Backend)(Dnd);
export default Calendar
