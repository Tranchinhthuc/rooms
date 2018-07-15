Rails.application.routes.draw do
  devise_for :employees
  resources :employees
  resources :schedules
  resources :appointments
  root 'static_pages#home'
  get '/week/appointments' => 'static_pages#week_appointments'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
