# == Schema Information
#
# Table name: contracts
#
#  id             :bigint(8)        not null, primary key
#  signed_date    :datetime
#  expired_date   :datetime
#  cancelled_date :datetime
#  room_id        :integer
#  tenant_id      :integer
#  status         :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class ContractTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
