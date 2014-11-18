json.array!(@favorite_foods) do |favorite_food|
  json.partial!("favorite_foods/favorite_food", favorite_food: favorite_food)
end
