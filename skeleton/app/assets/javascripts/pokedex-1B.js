Pokedex.RootView.prototype.renderPokemonDetail = function (pokemon) {
  var that = this;
  var $details = $("<div>");
  $details.addClass("detail");
  var $toyUl = $("<ul>");
  $toyUl.addClass("toys");
  $details.append($toyUl);
  $details.prepend("<img  src='" + pokemon.attributes.image_url +"'>");
  $details.append(pokemon.attributes.name + ": " + pokemon.attributes.poke_type);
  $details.append("<br> attacks: " + pokemon.attributes.attack + ", defense: "
  + pokemon.attributes.defense + "<br> moves: ");
  pokemon.attributes.moves.forEach(function(move) {
    $details.append(move +"<br>");
  })
  this.$pokeDetail.html($details);
  pokemon.fetch({
    success: function(){
      pokemon.toys().each(function(toy){
        that.addToyToList(toy);
      })
    }
  })
  
};
  
Pokedex.RootView.prototype.selectPokemonFromList = function (event) {
  event.preventDefault();
  var that = this;
  var $currentTarget = $(event.currentTarget);
  var id = $currentTarget.attr("id")
  var pokemon = new Pokedex.Models.Pokemon({ id: id });
  pokemon.fetch({
    success: function(){
      that.renderPokemonDetail(pokemon)
    }
  })
  
};


