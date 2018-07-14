class Schedule < ApplicationRecord
  validate :start_time_should_be_less_than_end_time

  private

  def start_time_should_be_less_than_end_time
    errors.add(:start_time, 'Start time should be less than end time') if start_time > end_time
  end
end
