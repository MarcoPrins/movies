class Rating < ActiveRecord::Base
  include Serializable

  belongs_to :movie
  belongs_to :user

  validates :stars,
            :movie_id,
            :user_id,
            presence: true

  validates :movie_id,
            uniqueness: { scope: :user_id }

  def self.rating_breakdown(user)
    where(user_id: user.id)
      .group(:stars)
      .count
  end
end
