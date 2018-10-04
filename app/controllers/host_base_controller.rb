class HostBaseController < ApplicationController
  layout 'host'

  before_action :authenticate_user!
  before_action :check_permission

  private

  def check_permission
    return if current_user.admin? || current_user.owner?
    return redirect_to root_path
  end
end
