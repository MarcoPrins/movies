Rails.application.routes.draw do
  get "/home", to: "application#home"

  resources :ratings, only: [:create, :update]

  resources :movies, except: [:show]
  get '/movies/categories', to: 'movies#categories'
end
