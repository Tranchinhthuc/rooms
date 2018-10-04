class CommunesController < ApplicationController
  def index
    communes = Commune.where(district_id: params[:district_id])
    render json: communes.as_json
  end
end
