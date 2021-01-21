class LadderGameChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find(params[:user_id])
    @match = Match.where(matchtype: "LADDER", status: "WAIT").first_or_create
    stream_from("ladder_game_channel_#{@match.id.to_s}")
    p "create for ladder_game_channel_#{@match.id}"
    @side = @match.users.count == 0 ? "LEFT" : "RIGHT"
    @card = Scorecard.create(user_id: @user.id, match_id: @match.id, side: @side)
    start if @match.reload.users.count == 2
    p "USER APPEAR"
  end

  def unsubscribed
    @id = current_user.id
    return if @id.nil?
    @card = Scorecard.where(user_id: @id, result: nil).first
    return if @card.nil?
    @match = Match.find(@card.match_id)
    return if @match.status.in? ['STOP', 'END']
    if @match.status == 'WAIT'
      @card.update(result: "ARCHIVE")
      @match.update(status: "ARCHIVE")
    else
      @card.update(result: "LOSE")
      @match.scorecards.where.not(user_id: @id).first.update(result: "WIN")
      @match.update(status: "GIVEUP")
      ActionCable.server.broadcast("ladder_game_channel_#{@match.id.to_s}", { "type": "GIVEUP" })
    end
    p "USER AWAY"
    # Any cleanup needed when channel is unsubscribed
  end

  def start
    @left = @match.users.where.not(id:@user.id).first
    p "start for ladder_game_channel_#{@match.id.to_s}"
    ActionCable.server.broadcast("ladder_game_channel_#{@match.id.to_s}", {
       match_id: @match.id,
       type: "START",
       left: @left.id,
       right: @user.id,
       addon_speed: @match.speed_addon,
       addon_ball: @match.ball_addon,
       addon_bound: @match.bound_addon,
       goal: @match.goal
    })
    @match.update(status: "PLAY")
  end
  
  def speak(msg)
    ActionCable.server.broadcast("ladder_game_channel_#{msg['match_id']}", msg)
  end
end
