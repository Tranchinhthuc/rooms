Rails.application.routes.draw do
  devise_for :employees
  resources :employees
  resources :appointments do
    get 'in_progress', on: :collection
  end
  root 'static_pages#home'
  get '/week/appointments' => 'static_pages#week_appointments'
  get '/month/appointments' => 'static_pages#month_appointments'
  get '/search' => 'static_pages#search'
  devise_for :users
end
