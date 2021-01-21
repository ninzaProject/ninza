class User < ApplicationRecord
    validates :intra_id, uniqueness: { strict: true }, presence: { strict: true }

    def login
        # 현재 로그인이 완벽하지 않기 때문에 꼼수를 부려야한다.
        # 로그인을해도 status 가 먼저 online이 되어있는 경우가 있으므로
        # 무조건 로그인 성공하는걸로 하자.
        self.status = 'online'
        self.save
        ActionCable.server.broadcast("side_bar_channel", {
            id: self.id,
            intra_id: self.intra_id,
            status: self.status
        })
    end

    # 여러번 브로드캐스팅 오는 문제 -> 이 문제는 문제가 아니다?
    def logout
        ActionCable.server.broadcast("side_bar_channel", {
            id: self.id,
            intra_id: self.intra_id,
            status: 'offline'
        })
        self.status = 'offline'
        self.save
    end
end
