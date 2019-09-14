class Rating < ActiveRecord::Base
  include Serializable

  belongs_to :movie

  validates :stars,
            :movie_id,
            :user_id,
            presence: true

  validates :movie_id,
            uniqueness: { scope: :user_id }
end
