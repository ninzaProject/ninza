class HomeController < ApplicationController
    # 메인페이지 보여주다가, 로그인 필요한 기능 누르면 로그인 시킬 것.

    def index
    end

    def signup
        begin
            user = User.create(signup_params)
            cookies.encrypted[:id] = user.id.to_s
            render :json => { user: user }
        rescue => exception
            render :json => { :errors => {'message': 'validation failure'} }
        end
    end

    # 로그인 성공하면 ActionCable.server.broadcast "side_bar_channel", message: data
    def signin
        if User.exists?(signin_params)
            user = User.find_by_intra_id(params[:user][:intra_id]);
            cookies.encrypted[:id] = user.id.to_s
            return render :json => { user: user }
        end
        render :json => { :errors => {'message': 'login failure'} }
    end

    def logout
        user = User.find_by_id(cookies.encrypted[:id]);
        cookies.encrypted[:id] = ""
        render :json => { :result => {'message': 'logout success'} }
    end

    def logined_user_list
        user_list = User.where.not(status: 'offline').select(:id, :intra_id, :status)
        render :json => { list: user_list }
    end

    private
    def signup_params
        params.require(:user).permit(:intra_id, :email, :password)
    end

    def signin_params
        params.require(:user).permit(:intra_id, :password)
    end
end
