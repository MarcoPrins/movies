class Movie < ActiveRecord::Base
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
end
