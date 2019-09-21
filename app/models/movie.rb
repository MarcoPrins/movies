class Movie < ActiveRecord::Base
  include Serializable

  paginates_per 10

  belongs_to :user
  has_many :ratings, dependent: :destroy

  validates :category,
            :title,
            :text,
            :user_id,
            presence: true

  validates :title, uniqueness: true

  default_scope { order('created_at DESC') }

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
    return nil if user == nil

    ratings.where(user_id: user.id).first ||
      Rating.new(movie_id: id, user_id: user.id)
  end

  def self.category_breakdown
    all_categories = categories.keys.map do |category|
      [category, where(category: category).count]
    end
    all_categories.to_h
  end
end
