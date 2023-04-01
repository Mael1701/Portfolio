Rails.application.routes.draw do
  resources :contacts, only: [:new, :create]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: "pages#home"
  get "about", to: "pages#about"
  get "project", to: "pages#projects"
  get "contact", to: "contacts#new"

end
