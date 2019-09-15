class ApplicationController < ActionController::Base
  layout 'application'
  helper_method :current_user

  def home
    @user = current_user&.serialize
  end

  def current_user
    # TODO: Implement

    User.first || nil
  end
end
