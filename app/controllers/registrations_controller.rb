class RegistrationsController < ApplicationController
  def create
    @registration = Registration.new(registration_params)
    @registration.save
    redirect_to root_path
    # render json: @registration.as_json
  end

  private

  def registration_params
    params.require(:registration).permit(
      :room_id,
      :customer_name,
      :message,
      :customer_contact_info
    )
  end
end
