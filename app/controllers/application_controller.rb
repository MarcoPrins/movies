class ApplicationController < ActionController::Base
  layout 'application'
  helper_method :current_user

  def home
    @user = current_user&.serialize
  end

  def current_user
    User.find_by_email(session[:user_email]) || nil
  end

  protected

  def run_and_respond(record, process)
    if process.call(record)
      render json: record.serialize
    else
      render json: record.errors.full_messages, status: 422
    end
  end
end
