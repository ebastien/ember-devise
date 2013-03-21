EmberDevise::Application.routes.draw do
  devise_for :users, :path => 'accounts', controllers: {sessions: 'sessions'}

  resources :users

  get '*ember', :to => "ember#index"
  get '/', :to => "ember#index"
end
