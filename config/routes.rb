Rails.application.routes.draw do
  devise_for :users
  resources :rooms
  resources :communes, only: [:index]
  resources :registrations
  root 'rooms#index'

  namespace :admin do
    root to: "rooms#index"
    resources :contracts
    resources :rooms
    resources :users
  end

  namespace :host do
    root to: "rooms#index"
    resources :rooms
    resources :contracts
  end
end
