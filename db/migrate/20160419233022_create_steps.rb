class CreateSteps < ActiveRecord::Migration
  def change
    create_table :steps do |t|
      t.references :todo, index: true, foreign_key: true
      t.string :description, null: false
      t.boolean :done, default: false

      t.timestamps null: false
    end
  end
end
