class Admin::CitiesController < AdminBaseController
  def index
    @cities = City.all
    # .page(params[:page])
  end

  def show
    @city = City.find(params[:id])
  end

  def new
    @city = City.new
  end

  def create
    @city = City.new(city_params)
    if @city.save
      redirect_to admin_citys_path
    else
      render :new
    end
  end

  def edit
    @city = City.find(params[:id])
  end

  def update
    @city = City.find(params[:id])
    if @city.update_attributes(city_params)
      redirect_to admin_citys_path
    else
      render :edit
    end
  end

  def destroy
    @city = City.find(params[:id])
    @city.destroy
    redirect_to citys_path
  end

  private

  def city_params
    params.require(:city).permit(
      :name,
      :city_id
    )
  end
end
