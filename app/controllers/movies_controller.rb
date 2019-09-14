class MoviesController < ApplicationController
  def index
    @movies_list_props = {
      movies: [],
    }
  end
end
