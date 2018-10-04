class AddImagesToRooms < ActiveRecord::Migration[5.2]
  def change
    add_column :rooms, :images, :json
  end
end
