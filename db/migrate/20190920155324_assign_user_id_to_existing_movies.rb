class AssignUserIdToExistingMovies < ActiveRecord::Migration[5.2]
  def change
    Movie.update_all user_id: User.first.id
  end
end
