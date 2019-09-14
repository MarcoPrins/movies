class Rating < ActiveRecord::Base
  belongs_to :movie

  validates :stars,
            :movie_id,
            :user_id,
            presence: true
end
