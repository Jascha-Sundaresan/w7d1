json.extract!(cat, :id, :name, :age, :created_at, :updated_at)

# Nesting associated data in the Cat show JSON.
if show_favorite_foods
  json.favorite_foods do
    json.array!(cat.favorite_foods) do |favorite_food|
      json.partial!("favorite_foods/favorite_food", favorite_food: favorite_food)
      # json.partial!(favorite_food)
    end
  end
end
