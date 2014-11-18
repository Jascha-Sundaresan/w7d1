Pokedex.RootView.prototype.addPokemonToList = function (pokemon) {
  var $li = $("<li>");
  $li.append(pokemon.attributes.name + ": " + pokemon.attributes.poke_type);
  this.$pokeList.append($li);
  $li.addClass("poke-list-item");
  $li.attr("id", pokemon.attributes.id)
};

Pokedex.RootView.prototype.refreshPokemon = function (callback) {
  var that = this;
  this.pokes.fetch({
    success: function(){
      that.pokes.each(that.addPokemonToList.bind(that))
    }
  });

};
