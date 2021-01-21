class SideBarChannel < ApplicationCable::Channel
  def subscribed
    stream_from "side_bar_channel"
    # current_user -> id, intra_id, status->online 세 가지 정보 넘겨주
    # ActionCable.server.broadcast("side_bar_channel", body: current_user)
    # 세이브 가드는 해줘야한다!
    # 게임 중계 채널은 누구나 구독이 가능. -> 게스트 또한 구독을 할 수있다는 뜻.
    return if current_user.nil?
    current_user.login
  end
  # 로그아웃에서의 문제 -> unsubscribed

  def unsubscribed
    # 프론트에서 (js)에서 unsubscribe를 하면 자동으로 이 메서드가 실행된다
    return if current_user.nil?
    current_user.logout
    # Any cleanup needed when channel is unsubscribed
  end

  def gameStart
    # current_user -> id;, intra_id, status->online
  end

end
