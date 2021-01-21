class User < ApplicationRecord
    validates :intra_id, uniqueness: { strict: true }, presence: { strict: true }

    has_many :scorecards
    has_many :matches, through: :scorecards
    has_one_attached :avatar
end
