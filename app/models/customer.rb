class Customer < ApplicationRecord
    belongs_to :user, foreign_key: "user_id"
    has_many :buildings

end
