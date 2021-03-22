Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount Blazer::Engine, at: "blazer"

  devise_for :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'
  get 'pages/commercial'
  get 'pages/residential'
  get 'pages/quote'# => 'application#quotes'
  #post 'create' => 'application#create'
  resources :quotes
  # authenticate :user, lamdba {|u| u.role == "admin"} do
  #   mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  # end
  resources :leads
  post '/leads', to: 'leads#create'

  get 'dropbox/auth_callback' => 'dropbox#auth_callback'

end

