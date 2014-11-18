# json.extract!(@cat, :id, :name, :age, :created_at, :updated_at)
json.partial!("cats/cat", cat: @cat, show_favorite_foods: true)

# json.extract!
# json.array!
# json.partial!
