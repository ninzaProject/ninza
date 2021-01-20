class ChangeStatusDefaultValueToUsers < ActiveRecord::Migration[6.1]
  def change
    change_column_null(:users, :status, false);
  end
end
