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

class Room < ApplicationRecord
  mount_uploaders :images, RoomUploader

  has_many :tenants, through: :contracts
  has_many :contracts
  has_many :room_images, dependent: :destroy
  belongs_to :district
  belongs_to :commune
  belongs_to :owner, class_name: 'User', foreign_key: :owner_id

  before_create :assign_address
  accepts_nested_attributes_for :room_images, allow_destroy: true

  enum status: [:available, :full, :leave_in_one_month]

  def self.status_s(status)
    {
      available: 'Đang trống',
      full: 'Đã có người ở',
      leave_in_one_month: 'Sẽ rời đi tháng sau'
    }[status.to_sym]
  end

  def status_s
    {
      available: 'Đang trống',
      full: 'Đã có người ở',
      leave_in_one_month: 'Sẽ rời đi tháng sau'
    }[status.to_sym]
  end

  private

  def assign_address
    return if address.present?
    self.address = "#{district.name} - #{commune.name}"
  end
end
