Rails.application.routes.draw do
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :posts, only: [ :index, :create, :show, :destroy, :update ]
    resources :categories, only: [ :index ]
  end

  match '*path', to: 'admin#index', via: :all
end
