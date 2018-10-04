class Commune < ApplicationRecord
  has_many :rooms
  belongs_to :district
end
