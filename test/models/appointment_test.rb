# == Schema Information
#
# Table name: appointments
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer
#  employee_id :integer
#  name        :string(255)
#  start_time  :datetime
#  end_time    :datetime
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class AppointmentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
