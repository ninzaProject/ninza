class SideBarChannel < ApplicationCable::Channel
  def subscribed
    stream_from "side_bar_channel"
    ActionCable.server.broadcast("side_bar_channel", body: current_user)
    p current_user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  ena
end
