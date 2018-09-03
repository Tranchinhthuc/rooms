// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require js.cookie
//= require jstz
//= require browser_timezone_rails/set_time_zone

$( document ).ready(function() {
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group" ).remove();
    // $( ".rbc-time-gutter.rbc-time-column" ).clone().prependTo( ".rbc-day-slot.rbc-time-column.rbc-today" );
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group .rbc-label" ).remove();
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group" ).text('thuc');
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group .rbc-time-slot:even" ).each((index)=>{
    //     this.style.color = "blue";
    // })
    let timeslots = [
        '8:00',
        '8:30',
        '9:00',
        '9:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00',
        '19:30'
    ]

    $( ".rbc-day-slot.rbc-time-column" ).each(function( index, element ) {
        $(element).find('.rbc-timeslot-group .rbc-time-slot:even').each((index, element)=>{
            $( element ).text(timeslots[index])
        })
    });

    // $('.rbc-header span').each(function (index, elem) {
    //     let elem_text = $(elem).text()
    //     let new_elem_text = ''
    //     new_elem_text = elem_text.replace('(', '<br>').replace('_', ' ').replace(')', '')
    //     $(elem).replaceWith(`<span>${new_elem_text}</span>`);
    // })

    // $('.rbc-date-cell a').each(function (index, elem) {
    //     let elem_text = $(elem).text()
    //     let new_elem_text = ''
    //     new_elem_text = elem_text.replace('(', '<br>').replace('_', ' ').replace(')', '')
    //     $(elem).replaceWith(`<a href='#'>${new_elem_text}</a>`);
    // })
});
