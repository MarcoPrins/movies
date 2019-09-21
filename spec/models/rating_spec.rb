require 'rails_helper'

describe 'Rating' do
  describe 'rating breakdown' do
    it 'gives a breakdown of the ratings by stars, and number of ratings' do
      user = create :user
      irelevant_user = create :user

      create :rating, stars: 2, user_id: user.id
      create :rating, stars: 2, user_id: user.id
      create :rating, stars: 2, user_id: user.id
      create :rating, stars: 1, user_id: user.id
      create :rating, stars: 5, user_id: user.id
      create :rating, stars: 2, user_id: irelevant_user.id

      expect(Rating.rating_breakdown(user)).to eq({
        1 => 1,
        2 => 3,
        5 => 1,
      })
    end
  end
end
