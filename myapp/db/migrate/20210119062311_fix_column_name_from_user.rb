class FixColumnNameFromUser < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :name, :intra_id
  end
end
