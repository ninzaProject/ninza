class CreateGuilds < ActiveRecord::Migration[6.1]
  def change
    create_table :guilds do |t|
      t.integer :rank
      t.string :name
      t.integer :guild_points
      t.string :officer

      t.timestamps
    end
  end
end
