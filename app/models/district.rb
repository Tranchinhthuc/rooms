# == Schema Information
#
# Table name: districts
#
#  id         :bigint(8)        not null, primary key
#  name       :string(255)
#  city_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class District < ApplicationRecord
  belongs_to :city
  has_many :rooms
  has_many :communes
end
