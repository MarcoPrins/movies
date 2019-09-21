require 'rails_helper'

describe MoviesController, type: :controller do
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
    before :each do
      @user = create :user
      @movie_1 = create :movie, category: :action, title: 'Action movie', user_id: @user.id
      @movie_2 = create :movie, category: :suspense, title: 'Suspense movie', user_id: @user.id
      @movie_3 = create :movie, category: :suspense, title: 'Suspense movie 2', user_id: @user.id
    end

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
      expect(Movie).to receive(:page).with('1').and_return(Movie.where(id: @movie_1.id).page(1))

      get :index, params: { page: 1 }
      expect(fetch_movies_from(response)).to eq([movies[2]])
    end

    it 'returns a movie filtered by search term if search is passed' do
      expect(Movie).to receive(:search).with('Action movie').and_return(Movie.where(id: @movie_1.id))

      get :index, params: { search: 'Action movie' }
      expect(fetch_movies_from(response)).to eq([movies[2]])
    end

    it 'returns a movie filtered by user rating if passed' do
      expect(Movie).to receive(:by_user_rating).with(nil, '1').and_return(Movie.where(id: @movie_1.id))

      get :index, params: { rating: 1 }
      expect(fetch_movies_from(response)).to eq([movies[2]])
    end

    it 'returns total pages' do
      get :index
      expect(JSON.parse(response.body)['totalPages']).to eq(1)
    end
  end

  describe 'GET category_breakdown' do
    it 'returns the category breakdown' do
      expect(Movie).to receive(:category_breakdown).and_return({'drama' => 8})

      get :category_breakdown
      expect(response.body).to eq("{\"drama\":8}")
    end
  end

  describe 'GET ratings_breakdown' do
    it 'returns the ratings breakdown' do
      expect(Rating).to receive(:rating_breakdown).and_return({1 => 8})

      get :rating_breakdown
      expect(response.body).to eq("{\"1\":8}")
    end
  end

  describe 'POST create' do
    it 'creates a movie for the current user and returns it' do
      attrs = { title: 'Movie One', text: 'Description', category: 'action' }

      user = create :user
      expect_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      post :create, params: { movie: attrs }
      expect(extract_attributes(JSON.parse(response.body))).to eq({
        'category' => 'action',
        'text' => 'Description',
        'title' => 'Movie One',
        'userId' => user.id,
      })

      movie = Movie.last
      expect(movie.user_id).to eq(user.id)
      expect(movie.title).to eq('Movie One')
      expect(movie.text).to eq('Description')
      expect(movie.category).to eq('action')
    end
  end

  describe 'PUT update' do
    it 'updates a movie belonging to the current user and returns it' do
      user = create :user
      movie = create :movie, user_id: user.id

      expect_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      put :update, params: { id: movie.id, movie: { title: 'New title', text: 'New text' } }

      attrs = JSON.parse(response.body)
      expect(attrs['id']).to eq(movie.id)
      expect(attrs['title']).to eq('New title')
      expect(attrs['text']).to eq('New text')

      movie.reload
      expect(movie.title).to eq('New title')
    end

    it 'does not update a movie that does not belong to the current user' do
      user = create :user
      movie = create :movie

      expect_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      put :update, params: { id: movie.id, movie: { title: 'New title', text: 'New text' } }

      expect(response.status).to eq(403)

      movie.reload
      expect(movie.title).not_to eq('New title')
    end
  end

  describe 'DELETE destroy' do
    it 'destroys a movie belonging to the current user' do
      user = create :user
      movie = create :movie, user_id: user.id

      expect_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      delete :destroy, params: { id: movie.id }

      attrs = JSON.parse(response.body)
      expect(attrs['id']).to eq(movie.id)
      expect(attrs['title']).to eq(movie.title)

      expect(Movie.where(id: movie.id).count).to eq(0)
    end

    it 'does not destroy a movie that does not belong to the current user' do
      user = create :user
      movie = create :movie

      expect_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)

      delete :destroy, params: { id: movie.id }

      expect(response.status).to eq(403)

      expect(Movie.where(id: movie.id).count).to eq(1)
    end
  end

  def fetch_movies_from(response)
    JSON.parse(response.body)['movies'].map{ |hash| extract_attributes(hash) }
  end
end
