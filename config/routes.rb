Rails.application.routes.draw do
  devise_for :employees
  resources :employees
  get '/appointments/in_progress' => 'static_pages#in_progress'
  resources :appointments
  root 'static_pages#home'
  get '/week/appointments' => 'static_pages#week_appointments'
  get '/month/appointments' => 'static_pages#month_appointments'
  get '/search' => 'static_pages#search'
  devise_for :users
end
