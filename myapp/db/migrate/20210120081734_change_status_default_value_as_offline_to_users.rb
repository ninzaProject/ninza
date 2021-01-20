class ChangeStatusDefaultValueAsOfflineToUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:users, :status, "offline");
  end
end
