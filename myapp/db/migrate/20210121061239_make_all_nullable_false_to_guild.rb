class MakeAllNullableFalseToGuild < ActiveRecord::Migration[6.1]
  def change
    change_column_null(:guilds, :rank, false)
    change_column_null(:guilds, :name, false)
    change_column_null(:guilds, :guild_points, false)
    change_column_null(:guilds, :officer, false)
  end
end
