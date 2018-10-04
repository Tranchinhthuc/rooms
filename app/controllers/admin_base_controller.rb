class AdminBaseController < ApplicationController
  layout 'admin'

  before_action :authenticate_user!
  before_action :check_permission

  private

  def check_permission
    unless current_user.admin?
      redirect_to root_path
    end
  end
end
