class Admin::DistrictsController < AdminBaseController
  def index
    @districts = District.all
    # .page(params[:page])
  end

  def show
    @district = District.find(params[:id])
  end

  def new
    @district = District.new
  end

  def create
    @district = District.new(district_params)
    if @district.save
      redirect_to admin_districts_path
    else
      render :new
    end
  end

  def edit
    @district = District.find(params[:id])
  end

  def update
    @district = District.find(params[:id])
    if @district.update_attributes(district_params)
      redirect_to admin_districts_path
    else
      render :edit
    end
  end

  def destroy
    @district = District.find(params[:id])
    @district.destroy
    redirect_to districts_path
  end

  private

  def district_params
    params.require(:district).permit(
      :name,
      :city_id
    )
  end
end
