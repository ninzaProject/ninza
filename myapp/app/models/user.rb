class User < ApplicationRecord
    validates :intra_id, uniqueness: { strict: true }, presence: { strict: true }
end
