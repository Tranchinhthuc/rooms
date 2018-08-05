class AppointmentsController < ApplicationController
  protect_from_forgery with: :null_session, if: proc { |c| c.request.format.json? }

  before_action :set_appointment, only: [:update, :destroy]

  def index
    @appointments = Appointment.all

    render(json: @appointments.map { |appointment|
      appointment_as_json(appointment)
    })
  end

  def in_progress
    @appointments = Appointment.where('start_time > ?', Time.zone.now)

    render(json: @appointments.map { |appointment|
      appointment_as_json(appointment)
    })
  end

  def create
    @appointment = Appointment.new
    @appointment.name = params[:title]
    @appointment.user_id = params[:user_id]
    @appointment.employee_id = params[:resource_id]
    @appointment.start_time = params[:start_time].to_datetime + params[:time_zone].to_i.hours
    @appointment.end_time = params[:end_time].to_datetime + params[:time_zone].to_i.hours
    if @appointment.save
      if params[:weekly]
        date = @appointment.start_time.to_date
        week_count = (Date.today.end_of_year.to_date - @appointment.start_time.to_date).to_i / 7
        week_count.times do |i|
          new_app = @appointment.dup
          new_app.start_time = @appointment.start_time + ((i + 1) * 7).days
          new_app.end_time = @appointment.end_time + ((i + 1) * 7).days
          new_app.save
        end
      end

      appointments = Appointment.all
      appointments_as_json = appointments.map { |appointment| appointment_as_json(appointment) }
      render(json: {appointment: appointment_as_json(@appointment),
        appointments: appointments_as_json,
        statistic: Appointment.statistic(Appointment.all)})
    else
      render(json: {errors: @appointment.errors})
    end
  end

  def update
    @appointment.start_time = params[:start_time].to_datetime + params[:time_zone].to_i.hours
    @appointment.end_time = params[:end_time].to_datetime + params[:time_zone].to_i.hours
    if @appointment.save
      render(json: appointment_as_json(@appointment))
    else
      render(json: {errors: @appointment.errors})
    end
  end

  def destroy
    if @appointment.destroy
      render(json: appointment_as_json(@appointment))
    else
      render(json: {errors: @appointment.errors})
    end
  end

  private
    def set_appointment
      @appointment = Appointment.find(params[:id])
    end

    def appointment_as_json(appointment)
      user = appointment.user
      employee = appointment.employee
      appointment = appointment.as_json
      appointment[:start] = appointment['start_time'].to_f*1000
      appointment[:end] = appointment['end_time'].to_f*1000
      appointment[:title] = appointment['name']
      appointment[:userEmail] = user.try(:email)
      appointment[:resourceId] = employee.try(:id)
      appointment[:resourceTitle] = employee.try(:name)
      appointment
    end

    def round_minute(hour, minute)
      case minute
      when (1..14)
        minute = 15
      when (16..29)
        minute = 30
      when (31..44)
        minute = 45
      when (46..59)
        minute = 0
        hour = hour + 1
      end
      [hour, minute]
    end
end
