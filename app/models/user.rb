class User < ActiveRecord::Base
  include Serializable

  has_many :ratings

  validates :email, presence: true

  def authenticate(password)
    # This is not a viable authentication method
    # It is just a stub since robust auth is not the focus of this exercise
    password == 'bayern4life'
  end
end
