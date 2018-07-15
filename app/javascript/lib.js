// @flow
export const timeShotHeight = 45

const arr = []
for (let i = 0; i <= 95; i++) {
  arr.push({
    timeStr: `${parseInt(i / 4) < 10 ? '0' : ''}${parseInt(i / 4)}:${i % 4 === 0 ? '0' : ''}${15*(i%4)}`,
    height: i * timeShotHeight,
  })
}
export const dateTimeStamp = arr

export const appointmentConvertor = (events) => {
  events.map((event) => {
    event.end = new Date(event.end)
    event.start = new Date(event.start)
    return event
  })
  return events
}

export const timeToHHMMString = (time) => {
  return `${time.getHours()}:${time.getMinutes()}`
}

export const timeZone = new Date().getTimezoneOffset()/60

export const countAppointmentsInDay = (appointments, datetime) => {
  return appointments.filter((app)=>{
    console.log('app', app)
    return app.start.getDate() === datetime.getDate()
  }).length
}
