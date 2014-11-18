class FavoriteFood < ActiveRecord::Base
  belongs_to :cat
  validates :cat, :name, presence: true
end
