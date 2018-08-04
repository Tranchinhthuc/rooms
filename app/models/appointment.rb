class Appointment < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :employee, optional: true

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
end
