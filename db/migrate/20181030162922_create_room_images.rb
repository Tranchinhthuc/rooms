class CreateRoomImages < ActiveRecord::Migration[5.2]
  def change
    create_table :room_images do |t|
      t.integer :room_id
      t.string :image

      t.timestamps
    end
  end
end
