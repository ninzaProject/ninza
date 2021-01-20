class SideBarChannel < ApplicationCable::Channel
  def subscribed
    stream_from "side_bar_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
