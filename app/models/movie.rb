class Movie < ActiveRecord::Base
  include Serializable

  has_many :ratings

  validates :category,
            :title,
            :text,
            presence: true

  enum category: {
    action:    1,
    drama:     2,
    comedy:    3,
    suspense:  4,
  }

  def average_stars
    return nil unless ratings.count > 0
    ratings.sum(:stars) / ratings.count
  end

  def user_rating(user)
    ratings.where(user_id: user.id).first ||
      Rating.new(movie_id: id, user_id: user.id)
  end
end
