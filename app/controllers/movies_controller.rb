class MoviesController < ApplicationController
  def index
    movies = apply_filters(Movie.all)

    render json: {
      movies: movies_json(movies),
      totalPages: movies.total_pages,
    }
  end

  def categories
    render json: Movie.category_breakdown
  end

  def create
    movie = Movie.new(movie_params.merge({ user_id: current_user.id }))
    run_and_respond(movie, ->(movie) { movie.save } )
  end

  def update
    find_movie
    run_and_respond(@movie, ->(movie) { movie.update(movie_params) })
  end

  def destroy
    find_movie
    run_and_respond(@movie, ->(movie) { movie.destroy })
  end

  private

  def find_movie
    @movie = current_user.movies.find(params[:id])
  end

  def apply_filters(movies)
    movies = movies.where(category: index_params[:category]) if index_params[:category].present?
    movies = movies.page(index_params[:page])

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

  def movie_params
    params.require(:movie).permit(:title, :text, :category)
  end

  def index_params
    params.permit(:category, :page)
  end
end
