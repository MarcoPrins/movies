class MoviesController < ApplicationController
  def index
    @movies_list_props = {
      movies: movies_json,
      user: user_json,
    }
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

  def movies_json
    Movie.all.map do |movie|
      movie.serialize(
        methods: [:average_stars],
        current_user_rating: ->(movie) { movie.user_rating(current_user) }
      )
    end
  end

  def user_json
    current_user.serialize(methods: [:logged_in?])
  end
end
