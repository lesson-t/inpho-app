Rails.application.routes.draw do 
  devise_for :users
  root to: "posts#index"

  resources :posts do

    resources :comments, only: [:new, :index, :create]
    resource :like, only: [:show, :create, :destroy]
  end

  resource :profile, only: [:show, :edit, :update] 

end
