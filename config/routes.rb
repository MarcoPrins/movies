Rails.application.routes.draw do
  get "/home", to: "application#home", as: :home

  resources :ratings, only: [:create, :update]
  resources :sessions, only: [:new, :create]
  get '/sessions/logout', to: 'sessions#logout'

  resources :movies, except: [:show]
  get '/movies/categories', to: 'movies#categories'
end
