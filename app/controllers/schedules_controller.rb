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
    @schedule.title = params[:title]
    @schedule.start_time = params[:start_time].to_datetime + params[:time_zone].to_i.hours
    @schedule.end_time = params[:end_time].to_datetime + params[:time_zone].to_i.hours
    if @schedule.save
      render(json: schedule_as_json(@schedule))
    else
      render(json: {errors: @schedule.errors})
    end
  end

  def update
    @schedule.start_time = params[:start_time].to_datetime + params[:time_zone].to_i.hours
    @schedule.end_time = params[:end_time].to_datetime + params[:time_zone].to_i.hours
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
      schedule[:start] = schedule['start_time'].to_f*1000
      schedule[:end] = schedule['end_time'].to_f*1000
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
