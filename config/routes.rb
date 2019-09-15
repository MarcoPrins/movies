Rails.application.routes.draw do
  get "/home", to: "application#home"

  resources :ratings, only: [:create, :update]

  resources :movies
  get '/movies/categories', to: 'moves#categories'
end
