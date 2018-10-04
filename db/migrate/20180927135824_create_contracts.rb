class CreateContracts < ActiveRecord::Migration[5.2]
  def change
    create_table :contracts do |t|
      t.datetime :signed_date
      t.datetime :expired_date
      t.datetime :cancelled_date
      t.integer :room_id
      t.integer :tenant_id
      t.integer :status

      t.timestamps
    end
  end
end
