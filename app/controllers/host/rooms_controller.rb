class Host::RoomsController < HostBaseController
  def index
    @rooms = Room.includes(:district, :commune).all
    # .page(params[:page])
  end

  def show
    @room = Room.find(params[:id])
  end

  def new
    @room = Room.new
  end

  def create
    @room = Room.new(room_params)
    @room.owner_id = current_user.id
    if @room.save
      params[:room_images]['image'].each do |img|
        @room_image = @room.room_images.create!(image: img)
      end
      redirect_to host_rooms_path
    else
      render :new
    end
  end

  def edit
    @room = Room.find(params[:id])
  end

  def update
    @room = Room.find(params[:id])
    if @room.update_attributes(room_params)
      if params[:room_images] && params[:room_images]['image']
        params[:room_images]['image'].each do |img|
          @room_image = @room.room_images.create!(image: img)
        end
      end
      redirect_to host_rooms_path
    else
      render :edit
    end
  end

  def destroy
    @room = Room.find(params[:id])
    @room.destroy
    redirect_to rooms_path
  end

  private

  def room_params
    params.require(:room).permit(
      :owner_id,
      :status,
      :district_id,
      :commune_id,
      :name,
      :size,
      :price,
      room_images_attributes: [:id, :room_id, :image, :_destroy]
    )
  end
end
