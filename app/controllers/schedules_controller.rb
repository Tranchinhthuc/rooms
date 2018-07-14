class SchedulesController < ApplicationController
  before_action :set_schedule, only: [:update, :destroy]

  def index
    @schedules = Schedule.all

    render(json: @schedules.map { |schedule|
      schedule_as_json(schedule)
    })
  end

  def create
    @schedule = Schedule.new
    today = Date.today
    start_time = params[:start_time].split(':')
    end_time = params[:end_time].split(':')
    start_time_round = round_minute(start_time[0].to_i, start_time[1].to_i)
    end_time_round = round_minute(end_time[0].to_i, end_time[1].to_i)
    @schedule.start_time = DateTime.new(today.year,today.month, today.day, start_time_round[0].to_i, start_time_round[1].to_i)
    @schedule.end_time = DateTime.new(today.year,today.month, today.day, end_time_round[0].to_i, end_time_round[1].to_i)
    @schedule.title = params[:title]
    if @schedule.save
      render(json: schedule_as_json(@schedule))
    else
      render(json: {errors: @schedule.errors})
    end
  end

  def update
    today = Date.today
    start_time = params[:start_time].split(':')
    end_time = params[:end_time].split(':')
    start_time_round = round_minute( start_time[0].to_i, start_time[1].to_i)
    end_time_round = round_minute( end_time[0].to_i, end_time[1].to_i)
    @schedule.start_time = DateTime.new(today.year,today.month, today.day, start_time_round[0].to_i, start_time_round[1].to_i)
    @schedule.end_time = DateTime.new(today.year,today.month, today.day, end_time_round[0].to_i, end_time_round[1].to_i)

    if @schedule.save
      render(json: schedule_as_json(@schedule))
    else
      render(json: {errors: @schedule.errors})
    end
  end

  def destroy
    if @schedule.destroy
      render(json: schedule_as_json(@schedule))
    else
      render(json: {errors: @schedule.errors})
    end
  end

  private
    def set_schedule
      @schedule = Schedule.find(params[:id])
    end

    def schedule_as_json(schedule)
      schedule = schedule.as_json
      schedule[:hour_start_time] = schedule['start_time'].hour
      schedule[:minute_start_time] = schedule['start_time'].min
      schedule[:hour_end_time] = schedule['end_time'].hour
      schedule[:minute_end_time] = schedule['end_time'].min
      schedule[:duration] = (schedule['end_time'] - schedule['start_time']) / 60
      schedule
    end

    def round_minute(hour, minute)
      case minute
      when (1..14)
        minute = 15
      when (16..29)
        minute = 30
      when (31..44)
        minute = 45
      when (46..59)
        minute = 0
        hour = hour + 1
      end
      [hour, minute]
    end
end
