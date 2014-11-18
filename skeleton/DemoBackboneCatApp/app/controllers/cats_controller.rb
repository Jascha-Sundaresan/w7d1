class CatsController < ApplicationController
  def create
    @cat = Cat.new(cat_params)
    if @cat.save
      render :show
    else
      render json: @cat.errors.full_messages, status: 422
    end
  end

  def index
    if params.include?(:max_age)
      @cats = Cat.where("age <= ?", params[:max_age])
    elsif params.include?(:min_age)
      @cats = Cat.where("age > ?", params[:min_age])
    else
      @cats = Cat.all
    end

    render :index
  end

  def show
    @cat = Cat.find(params[:id])
    render :show
  end

  def update
    @cat = Cat.find(params[:id])
    if @cat.update_attributes(cat_params)
      render :show
    else
      render json: @cat.errors.full_messages, status: 422
    end
  end

  private
  def cat_params
    params.require(:cat).permit(:name, :age)
  end
end
