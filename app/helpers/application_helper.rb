module ApplicationHelper
  def user_css_class_by_room_status(room)
    return 'red' if room.full?
    return 'green' if room.available?
    'blue'
  end

  def admin_css_class_by_room_status(room)
    return 'green' if room.full?
    return 'red' if room.available?
    'blue'
  end
end
