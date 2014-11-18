json.array!(@cats) do |cat|
  json.partial!("cats/cat", cat: cat, show_favorite_foods: false)
end
