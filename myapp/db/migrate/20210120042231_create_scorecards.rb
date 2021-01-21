class CreateScorecards < ActiveRecord::Migration[6.1]
  def change
    create_table :scorecards do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :match, null: false, foreign_key: true
      t.string :side
      t.integer :score, default: 0
      t.string :result

      t.timestamps
    end
  end
end
