require 'rails_helper'

describe MoviesController, type: :controller do
  before :each do
    @user = create :user
    @movie_1 = create :movie, category: :action, title: 'Action movie', user_id: @user.id
    @movie_2 = create :movie, category: :suspense, title: 'Suspense movie', user_id: @user.id
    @movie_3 = create :movie, category: :suspense, title: 'Suspense movie 2', user_id: @user.id
  end

  let(:movies) {
    [
      {
        'averageStars' => nil,
        'category' => "suspense",
        'currentUserRating' => nil,
        'text' => "Example text",
        'title' => "Suspense movie 2",
        'userId' => @user.id,
      },
      {
        'averageStars' => nil,
        'category' => "suspense",
        'currentUserRating' => nil,
        'text' => "Example text",
        'title' => "Suspense movie",
        'userId' => @user.id,
      },
      {
        'averageStars' => nil,
        'category' => "action",
        'currentUserRating' => nil,
        'text' => "Example text",
        'title' => "Action movie",
        'userId' => @user.id,
      },
    ]
  }

  describe 'GET index' do
    it 'returns all movies as json without params' do
      get :index
      expect(fetch_movies_from(response)).to eq(movies)
    end

    it 'returns movies filtered by category if category param is passed' do
      get :index, params: { category: :suspense }
      expect(fetch_movies_from(response)).to eq([movies[0], movies[1]])
    end

    it 'returns paginated movies if page param is passed' do
      # Pagination is stubbed for simplicity & to maintain focus of this unit test
      # on controller functionality rather than kaminari funcionality
      expect(Movie).to receive(:page).with('1').and_return(Movie.page(1).per(1))

      get :index, params: { page: 1 }
      expect(fetch_movies_from(response)).to eq([movies[0]])
    end

    it 'returns a movie filtered by search term if search is passed' do
      get :index, params: { search: 'Action movie' }
      expect(fetch_movies_from(response)).to eq([movies[2]])
    end

    it 'returns total pages' do
      get :index
      expect(JSON.parse(response.body)['totalPages']).to eq(1)
    end
  end

  describe 'POST create' do
    it 'creates a movie'
  end

  describe 'PUT update' do
    it 'updates a movie'
  end

  describe 'DELETE destroy' do
    it 'destroys a movie'
  end

  def fetch_movies_from(response)
    JSON.parse(response.body)['movies'].map{ |hash| extract_attributes(hash) }
  end
end
