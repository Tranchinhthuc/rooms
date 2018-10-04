# == Schema Information
#
# Table name: rooms
#
#  id          :bigint(8)        not null, primary key
#  owner_id    :integer
#  status      :integer
#  district_id :integer
#  size        :float(24)
#  price       :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class RoomTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
