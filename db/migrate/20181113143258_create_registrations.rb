class CreateRegistrations < ActiveRecord::Migration[5.2]
  def change
    create_table :registrations do |t|
      t.integer :room_id
      t.string :customer_name
      t.text :message
      t.string :customer_contact_info

      t.timestamps
    end
  end
end
