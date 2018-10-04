class RoomsController < ApplicationController
  add_breadcrumb "home", :root_path

  def index
    @rooms = @search.result.includes(:district, :commune, :room_images).where(status: [:available, :leave_in_one_month]).page(params[:page])
    # .page(params[:page])
    # add_breadcrumb 'index', :rooms_path, title: 'Danh sách'
  end

  def show
    @room = Room.find(params[:id])
    # add_breadcrumb 'show', :room_path, title: 'Chi tiết'
  end

  # def new
  #   @employee = Employee.new
  # end

  # def create
  #   @employee = Employee.new(employee_params)
  #   if @employee.save
  #     redirect_to employees_path
  #   else
  #     render :new
  #   end
  # end

  # def edit
  #   @employee = Employee.find(params[:id])
  # end

  # def update
  #   @employee = Employee.find(params[:id])
  #   if @employee.update_attributes(employee_params)
  #     redirect_to employees_path
  #   else
  #     render :edit
  #   end
  # end

  # def destroy
  #   @employee = Employee.find(params[:id])
  #   @employee.destroy
  #   redirect_to employees_path
  # end

  # private

  # def employee_as_json(employee)
  #   appointment_count = employee.appointments.count
  #   employee = employee.as_json
  #   employee[:appointmentCount] = appointment_count
  #   employee
  # end

  # def employee_params
  #   params.require(:employee).permit(
  #     :email,
  #     :name
  #   )
  # end

end
