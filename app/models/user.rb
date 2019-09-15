class User < ActiveRecord::Base
  include Serializable

  has_many :ratings

  validates :email, presence: true
end
