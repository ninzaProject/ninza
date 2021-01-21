class GuildController < ApplicationController

    def list
        # @list = Guild.all
        render :json => Guild.all
    end

    def guild_create
        begin
            p "Debug 1"
            @guild = Guild.create(guild_params)
            p "Debug 2"
            render :json => { guild: @guild }
        rescue
            render :json => { errors: { message: "guild create failure " } }
        end
    end
  
    def guild_params
        { name: params[:guild]['name'], rank: 1, guild_points: 24, officer: "eunhkim" }
    end

end
# http://127.0.0.1:3000/?guild-name=123#/create