Rails.application.routes.draw do
  devise_for :employees
  resources :employees
  resources :appointments
  root 'static_pages#home'
  get '/week/appointments' => 'static_pages#week_appointments'
  get '/month/appointments' => 'static_pages#month_appointments'
  devise_for :users
end
