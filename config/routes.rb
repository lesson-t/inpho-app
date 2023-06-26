Rails.application.routes.draw do 
  devise_for :users
  root to: "posts#index"

  resources :posts do

    resource :like, only: [:show, :create, :destroy]
  end

  resource :profile, only: [:show, :edit, :update] 

end
