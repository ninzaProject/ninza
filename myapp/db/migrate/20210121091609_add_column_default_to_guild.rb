class AddColumnDefaultToGuild < ActiveRecord::Migration[6.1]
  def change
    change_column_default(:guilds, :rank, 1)
    change_column_default(:guilds, :name, "")
    change_column_default(:guilds, :guild_points, 0)
    change_column_default(:guilds, :officer, "")
  end
end
