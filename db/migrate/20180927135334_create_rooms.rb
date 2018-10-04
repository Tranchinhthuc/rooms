class CreateRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :rooms do |t|
      t.integer :owner_id
      t.integer :status
      t.integer :district_id
      t.integer :commune_id
      t.float :size
      t.string :price
      t.float :elictrical_price
      t.float :water_price
      t.integer :water_fee_method
      t.string :address
      t.text :description

      t.timestamps
    end
  end
end
