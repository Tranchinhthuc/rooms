class AppointmentsController < ApplicationController
  protect_from_forgery with: :null_session, if: proc { |c| c.request.format.json? }

  before_action :set_appointment, only: [:update, :destroy]

  def index
    @appointments = Appointment.all

    render(json: @appointments.map { |appointment|
      appointment_as_json(appointment)
    })
  end

  def create
    byebug
    @appointment = Appointment.new
    @appointment.name = params[:title]
    @appointment.start_time = params[:start_time].to_datetime + params[:time_zone].to_i.hours
    @appointment.end_time = params[:end_time].to_datetime + params[:time_zone].to_i.hours
    if @appointment.save
      render(json: appointment_as_json(@appointment))
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
      appointment = appointment.as_json
      appointment[:start] = appointment['start_time'].to_f*1000
      appointment[:end] = appointment['end_time'].to_f*1000
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
