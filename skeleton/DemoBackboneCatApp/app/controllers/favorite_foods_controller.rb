class FavoriteFoodsController < ApplicationController
  def index
    @cat = Cat.find(params[:cat_id])
    @favorite_foods = @cat.favorite_foods
    render :index
  end
end
