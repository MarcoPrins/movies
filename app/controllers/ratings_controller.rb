class RatingsController < ApplicationController
  def create
    rating = Rating.create! rating_params.permit(:stars, :movie_id).merge user_id: current_user.id
    render json: rating.serialize
  end

  def update
    rating = Rating.find(params[:id])
    rating.update! rating_params.permit(:stars)
    render json: rating.serialize
  end

  private

  def rating_params
    params.require(:rating)
  end
end
