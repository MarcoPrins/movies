class MoviesController < ApplicationController
  def index
    movies = index_params[:category].present? ?
      Movie.where(category: index_params[:category]) :
      Movie.all

    render json: movies_json(movies)
  end

  def categories
    render json: Movie.category_breakdown
  end

  def create
    # TODO:
  end

  def update
    # TODO:
  end

  def destroy
    # TODO:
  end

  private

  def movies_json(movies)
    movies.map do |movie|
      movie.serialize(
        methods: [:average_stars],
        current_user_rating: ->(movie) { movie.user_rating(current_user) },
      )
    end
  end

  def index_params
    params.permit(:category)
  end
end
