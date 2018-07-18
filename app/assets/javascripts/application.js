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

$( document ).ready(function() {
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group" ).remove();
    // $( ".rbc-time-gutter.rbc-time-column" ).clone().prependTo( ".rbc-day-slot.rbc-time-column.rbc-today" );
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group .rbc-label" ).remove();
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group" ).text('thuc');
    // $( ".rbc-day-slot.rbc-time-column.rbc-today .rbc-timeslot-group .rbc-time-slot:even" ).each((index)=>{
    //     this.style.color = "blue";
    // })
    let timeslots = [
        '8:00 AM',
        '8:30 AM',
        '9:00 AM',
        '9:30 AM',
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 PM',
        '12:30 PM',
        '1:00 PM',
        '1:30 PM',
        '2:00 PM',
        '2:30 PM',
        '3:00 PM',
        '3:30 PM',
        '4:00 PM',
        '4:30 PM',
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM'
    ]

    $( ".rbc-day-slot.rbc-time-column" ).each(function( index, element ) {
        $(element).find('.rbc-timeslot-group .rbc-time-slot:even').each((index, element)=>{
            $( element ).text(timeslots[index])
        })
        // this.style.color = "blue";
        // this.addClass("blue");
        // $( element ).text(timeslots[index]);
    });

    // $( ".rbc-date-cell" ).each(function( index, element ) {
    //     let text = $('.rbc-date-cell').text();
    //     console.log(text)
    // });
});
