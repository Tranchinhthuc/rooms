class CreateCommunes < ActiveRecord::Migration[5.2]
  def change
    create_table :communes do |t|
      t.integer :district_id
      t.string :name

      t.timestamps
    end
  end
end
