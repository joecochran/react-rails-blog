Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :posts, only: [ :index, :create, :show, :destroy ]
  end

  match '*path', to: 'pages#index', via: :all
end
