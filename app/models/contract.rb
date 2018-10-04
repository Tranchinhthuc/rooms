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

class Contract < ApplicationRecord
  belongs_to :room
  belongs_to :tenant, class_name: 'User', foreign_key: :tenant_id

  enum status: [:active, :expired]
end
