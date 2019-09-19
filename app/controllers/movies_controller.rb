class MoviesController < ApplicationController
  def index
    movies = apply_filters(Movie.all)
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

  def apply_filters(movies)
    movies = movies.where(category: index_params[:category]) if index_params[:category].present?
    movies = movies.page(index_params[:page]) if index_params[:page].present?

    movies
  end

  def movies_json(movies)
    movies.map do |movie|
      movie.serialize(
        methods: [:average_stars],
        current_user_rating: ->(movie) { movie.user_rating(current_user) },
      )
    end
  end

  def index_params
    params.permit(:category, :page)
  end
end
