class ApplicationController < ActionController::Base
  layout 'application'

  def home
    @current_user = current_user.serialize(methods: [:logged_in?])
  end

  def current_user
    # TODO: Implement
    User.first
  end
end
