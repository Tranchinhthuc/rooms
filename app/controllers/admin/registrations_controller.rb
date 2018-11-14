class Admin::RegistrationsController < AdminBaseController
  def index
    @registrations = Registration.all
    # .page(params[:page])
  end

  def show
    @registration = Registration.find(params[:id])
  end

  def new
    @registration = Registration.new
  end

  def create
    @registration = Registration.new(registration_params)
    if @registration.save
      redirect_to host_registrations_path
    else
      render :new
    end
  end

  def edit
    @registration = Registration.find(params[:id])
  end

  def update
    @registration = Registration.find(params[:id])
    if @registration.update_attributes(registration_params)
      redirect_to host_registrations_path
    else
      render :edit
    end
  end

  def destroy
    @registration = Registration.find(params[:id])
    @registration.destroy
    redirect_to registrations_path
  end

  private

  def registration_params
    params.require(:registration).permit(
      :signed_date,
      :expired_date,
      :cancelled_date,
      :room_id,
      :tenant_id,
      :status
    )
  end
end
