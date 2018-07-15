Rails.application.routes.draw do
  devise_for :employees
  resources :employees
  resources :schedules
  resources :appointments
  root 'static_pages#home'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
