class RoomImage < ApplicationRecord
  mount_uploader :image, RoomUploader
  belongs_to :room
end
