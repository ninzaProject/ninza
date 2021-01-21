Rails.application.routes.draw do
  get 'home/index'
  root 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/users/signup', to: 'home#signup'
  post '/users/signin', to: 'home#signin'
  get '/users/logout', to: 'home#logout'

  get '/guild', to: 'guild#list'
  post '/guild/create', to: 'guild#guild_create'

end
#
