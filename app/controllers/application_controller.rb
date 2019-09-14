class ApplicationController < ActionController::Base
  layout 'application'

  def current_user
    # TODO: Implement
    User.first
  end
end
