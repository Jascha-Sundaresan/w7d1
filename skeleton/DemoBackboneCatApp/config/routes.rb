Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :cats, defaults: {format: :json}, only: [:create, :index, :show, :update] do
    resources :favorite_foods, only: [:index]
  end

end
