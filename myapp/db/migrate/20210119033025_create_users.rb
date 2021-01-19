class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, default: "", null: false
      t.string :email, default: "", null: false
      t.string :password, default: "", null: false
      t.string :type, default: "guest", null: false
      t.boolean :authentication, default: false
      t.string :token, default: ""

      t.timestamps
    end
  end
end
