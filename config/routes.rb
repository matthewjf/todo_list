Rails.application.routes.draw do
  root 'static_pages#root'

  namespace :api do
    resources :todos, except: [:edit, :new] do
      resources :steps, only: [:index, :create]
    end

    resource :steps, except: [:index, :create, :new, :edit]
  end
end
