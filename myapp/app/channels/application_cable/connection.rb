module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    rescue_from StandardError, with: :report_error

    def connect
      self.current_user = find_verified_user
    end

    private
    def find_verified_user
      if !cookies.encrypted[:id].empty? && User.exists?(cookies.encrypted[:id])
        verified_user = User.find(cookies.encrypted[:id])
      else
        reject_unauthorized_connection
      end
    end

    def report_error(e)
      p e.message
    end
  end
end
