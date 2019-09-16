require 'rails_helper'

describe 'Movie' do
  describe 'average stars' do
    it 'calculates the average stars' do
      @movie = create :movie

      create :rating, stars: 1, movie_id: @movie.id
      create :rating, stars: 1, movie_id: @movie.id
      create :rating, stars: 3, movie_id: @movie.id
      create :rating, stars: 3, movie_id: @movie.id

      expect(@movie.average_stars).to eq(2)
    end

    it 'returns nil if there are no ratings' do
      @movie = create :movie
      expect(@movie.average_stars).to eq(nil)
    end
  end

  describe 'user_rating' do
    it 'returns the user rating if applicable' do
      @movie = create :movie
      @user = create :user
      @rating = create :rating, user_id: @user.id, movie_id: @movie.id

      expect(@movie.user_rating(@user)).to eq(@rating)
    end

    it 'returns a new unpersisted rating if user rating is not found' do
      @movie = create :movie
      @user = create :user
      @other_user = create :user
      @rating = create :rating, user_id: @other_user.id, movie_id: @movie.id

      expect(@movie.user_rating(@user).attributes).to eq(
        'id' => nil,
        'user_id' => @user.id,
        'movie_id' => @movie.id,
        'stars' => nil,
        'created_at' => nil,
        'updated_at' => nil
      )
    end
  end
end
