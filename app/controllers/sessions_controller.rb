class SessionsController < ApplicationController
  def create
    user = User.find_by_email(params[:email])

    if user && user.authenticate(params[:password])
      session[:user_email] = user.email
      redirect_to home_url
    else
      redirect_to request.referer
    end
  end

  def logout
    session[:user_email] = nil
    redirect_to home_url, notice: 'Logged out!'
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
