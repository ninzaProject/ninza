class AddGoalToMatches < ActiveRecord::Migration[6.1]
  def change
    add_column :matches, :goal, :integer, default: 3
  end
end
