class MoviesController < ApplicationController
  def index
    @movies_list_props = {
      movies: Movie.all.map { |movie| movie.serialize(methods: [:average_stars, :current_user_rating]) },
      user: User.first.serialize(methods: [:logged_in?])
    }
  end
end
