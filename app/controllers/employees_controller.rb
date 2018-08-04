class EmployeesController < ApplicationController
  protect_from_forgery with: :null_session, if: proc { |c| c.request.format.json? }

  def index
    @employees = Employee.all
  end

  def show
    @employee = Employee.find(params[:id])
  end

  def new
    @employee = Employee.new
  end

  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      redirect_to employees_path
    else
      render :new
    end
  end

  def edit
    @employee = Employee.find(params[:id])
  end

  def update
    @employee = Employee.find(params[:id])
    if @employee.update_attributes(employee_params)
      redirect_to employees_path
    else
      render :edit
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    @employee.destroy
    redirect_to employees_path
  end

  private

  def employee_as_json(employee)
    appointment_count = employee.appointments.count
    employee = employee.as_json
    employee[:appointmentCount] = appointment_count
    employee
  end

  def employee_params
    params.require(:employee).permit(
      :email,
      :name
    )
  end

end
