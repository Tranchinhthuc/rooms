class Appointment < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :employee, optional: true
end
