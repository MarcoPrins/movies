Rails.application.routes.draw do
  get "/home", to: "application#home", as: :home

  resources :ratings, only: [:create, :update]
  resources :sessions, only: [:new, :create]
  get '/sessions/logout', to: 'sessions#logout'

  resources :movies, except: [:show]
  get '/movies/category_breakdown', to: 'movies#category_breakdown'
  get '/movies/rating_breakdown', to: 'movies#rating_breakdown'
end
