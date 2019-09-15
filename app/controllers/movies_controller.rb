class MoviesController < ApplicationController
  def index
    render json: movies_json(Movie.all)
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

  def movie_params
    params.require(:movie)
  end
end
