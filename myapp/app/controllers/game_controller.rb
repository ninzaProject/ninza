class GameController < ApplicationController
    def report
      @user_id = params[:user_id]
      @match = Match.find(params[:match_id])
      @match.update(status: "END")
      @card = @match.scorecards.where(user_id: @user_id).first.update(score: params[:score], result: 'WIN')
      @card = @match.scorecards.where.not(user_id: @user_id).first.update(score: params[:score2], result: 'LOSE')
      render :json => { :result => {'message': 'report success'} }
    end
end
