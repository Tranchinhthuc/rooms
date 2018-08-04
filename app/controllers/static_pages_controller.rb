class StaticPagesController < ApplicationController
  def home
    set_data
  end

  def week_appointments
    set_data
  end

  def month_appointments
    set_data
  end

  def set_data
    appointments = Appointment.all
    @appointments_as_json = appointments.map { |appointment|
      appointment_as_json(appointment)
    }
    @statistic = Appointment.statistic(appointments)
    @employees = Employee.all.map { |employee| employee_as_json(employee) }
  end

  def search
    if params[:title]
      @appointments = Appointment.where('name like ?', "%#{params[:title]}%")
    else
      @appointments = Appointment.all
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

    def employee_as_json(employee)
      appointments = employee.appointments
      employee = employee.as_json
      employee[:appointments] = appointments.map{|appointment| appointment_as_json(appointment)}
      employee[:appointmentCount] = appointments.count
      employee
    end
end
