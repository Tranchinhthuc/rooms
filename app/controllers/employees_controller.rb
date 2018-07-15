class EmployeesController < ApplicationController
  protect_from_forgery with: :null_session, if: proc { |c| c.request.format.json? }

  def index
    @employees = Employee.all
    render(json: @employees.map { |employee|
      employee_as_json(employee)
    })
  end

  private

  def employee_as_json(employee)
    appointment_count = employee.appointments.count
    employee = employee.as_json
    employee[:appointmentCount] = appointment_count
    employee
  end

end
