class User < ActiveRecord::Base
  include Serializable

  has_many :ratings

  def logged_in?
    # TODO: Implement
    true
  end
end
