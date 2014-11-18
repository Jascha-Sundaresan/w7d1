Pokedex.RootView.prototype.addToyToList = function (toy) {
  var $li = $("<li>");
  $li.addClass("toy-list-item")
  $li.attr("data-id", toy.id);
  $li.attr("data-pokemon-id", toy.escape('pokemon_id'));
  
  $li.append("name: " + toy.get('name') + "<br>");
  $li.append("happiness: " + toy.attributes.happiness + "<br>");
  $li.append("price: " + toy.attributes.price + "<br>");
  this.$pokeDetail.find(".toys").append($li);  
};

Pokedex.RootView.prototype.renderToyDetail = function (toy) { 
  $detail = $("<div>");
  $detail.addClass("detail");
  $detail.prepend("<img src='" + toy.attributes.image_url + "'>");
  this.$toyDetail.html($detail);
  
};

Pokedex.RootView.prototype.selectToyFromList = function (event) {
  var that = this;
  var $currentTarget = $(event.currentTarget);
  var toyId = $currentTarget.data("id");
  var pokeId = $currentTarget.data('pokemon-id');
  var pokemon = new Pokedex.Models.Pokemon({id: pokeId});
  pokemon.fetch({
    success: function(){
      var toys = pokemon.toys();
      toys.each(function(toy){
        if (toy.id === toyId){
          that.renderToyDetail(toy)
        }
      })
    }
  })  
};
