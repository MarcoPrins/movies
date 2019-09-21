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

  describe 'search' do
    it 'returns records matching title or text' do
      @movie_1 = create :movie, title: 'searchterm xxxxxx', text: 'xxxxxx'
      @movie_2 = create :movie, title: 'xxxxxx', text: 'xxx searchterm'
      @movie_3 = create :movie, title: 'xxx', text: 'xxx'
      @movie_4 = create :movie, title: 'xx searchterm', text: 'xx'

      movies = Movie.search('searchterm')
      expect(movies.pluck(:id).sort).to eq([@movie_1.id, @movie_2.id, @movie_4.id].sort)
    end
  end

  describe 'by_user_rating' do
    it 'filters movie by assocated user rating' do
      user = create :user

      movie_1 = create :movie, title: 'test 1'
      movie_2 = create :movie, title: 'test 2'

      rating_1 = create :rating, user_id: user.id, stars: 1, movie_id: movie_1.id
      rating_2 = create :rating, user_id: user.id, stars: 2, movie_id: movie_2.id

      movies = Movie.by_user_rating(user, 1)
      expect(movies.pluck(:id)).to eq([movie_1.id])
    end
  end
end
