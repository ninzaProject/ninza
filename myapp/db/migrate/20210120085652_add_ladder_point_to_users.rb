class AddLadderPointToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :ladder_point, :integer
  end
end
