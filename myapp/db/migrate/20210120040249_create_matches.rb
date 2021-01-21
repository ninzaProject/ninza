class CreateMatches < ActiveRecord::Migration[6.1]
  def change
    create_table :matches do |t|
      t.string :matchtype, null: false
      t.string :status, default: "WAIT"
      t.string :speed_addon, default: "BASIC"
      t.string :bound_addon, default: "BASIC"
      t.string :ball_addon, default: "BASIC"
      t.timestamps
    end
  end
end
