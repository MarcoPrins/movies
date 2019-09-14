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
    ratings.sum(:stars) / ratings.count
  end

  def current_user_rating
    # TODO: Implement
    Rating.first
  end
end
