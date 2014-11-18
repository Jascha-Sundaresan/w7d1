class CreateFavoriteFoods < ActiveRecord::Migration
  def change
    create_table :favorite_foods do |t|
      t.integer :cat_id, null: false
      t.string :name, null: false

      t.timestamps
    end

    add_index :favorite_foods, :cat_id
  end
end
