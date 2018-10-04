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

class Appointment < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :employee, optional: true

  validate :start_time_should_be_less_than_end_time

  def in_today?
    start_time.to_date == Date.today
  end

  def in_this_week?
    start_time >= Time.now.beginning_of_week && start_time <= Time.now.end_of_week
  end

  def remain_in_this_week?
    start_time >= Time.now && start_time <= Time.now.end_of_week
  end

  def in_this_month?
    start_time >= Time.now.beginning_of_month && start_time <= Time.now.end_of_month
  end

  def remain_in_this_month?
    start_time >= Time.now && start_time <= Time.now.end_of_month
  end

  def in_this_year?
    start_time >= Time.now.beginning_of_year && start_time <= Time.now.end_of_year
  end

  def self.statistic(appointments)
    {
      total_appointments_of_this_week: appointments.count{ |app| app.in_this_week? },
      remain_appointments_of_this_week: appointments.count{ |app| app.remain_in_this_week? },
      total_appointments_of_this_month: appointments.count{ |app| app.in_this_month? },
      remain_appointments_of_this_month: appointments.count{ |app| app.remain_in_this_month? },
      total_appointments_of_this_year: appointments.count{ |app| app.in_this_year? },
      total_appointments_of_today: appointments.count{ |app| app.in_today? }
    }
  end

  private

  def start_time_should_be_less_than_end_time
    errors.add(:start_time, 'Start time should be less than end time') if start_time > end_time
  end
end
