class Cat < ActiveRecord::Base
  has_many :favorite_foods

  validates :name, :age, presence: true
end
