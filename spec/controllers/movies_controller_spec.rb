require 'rails_helper'

describe MoviesController, type: :controller do
  before :each do
    @movie_1 = create :movie, category: :action, title: 'Action movie'
    @movie_2 = create :movie, category: :suspense, title: 'Suspense movie'
    @movie_3 = create :movie, category: :suspense, title: 'Suspense movie 2'
  end

  let(:movies) {
    [
      {
        'averageStars' => nil,
        'category' => "action",
        'currentUserRating' => nil,
        'text' => "Example text",
        'title' => "Action movie",
        'userId' => nil
      },
      {
        'averageStars' => nil,
        'category' => "suspense",
        'currentUserRating' => nil,
        'text' => "Example text",
        'title' => "Suspense movie",
        'userId' => nil
      },
      {
        'averageStars' => nil,
        'category' => "suspense",
        'currentUserRating' => nil,
        'text' => "Example text",
        'title' => "Suspense movie 2",
        'userId' => nil
      }
    ]
  }

  describe 'GET index' do
    it 'returns all movies as json without params' do
      get :index
      expect(fetch_movies_from(response)).to eq(movies)
    end

    it 'returns movies filtered by category if category param is passed' do
      get :index, params: { category: :suspense }
      expect(fetch_movies_from(response)).to eq([movies[1], movies[2]])
    end

    it 'returns paginated movies if page param is passed' do
      # In this example pagination is stubbed
      # This is to maintain a pure unit test focussing only on the controller action
      # and not kaminari functionality
      expect(Movie).to receive(:page).with('7').and_return(Movie.limit(1))

      get :index, params: { page: 7 }
      expect(fetch_movies_from(response)).to eq([movies[0]])
    end
  end

  def fetch_movies_from(response)
    JSON.parse(response.body).map{ |hash| extract_attributes(hash) }
  end
end
