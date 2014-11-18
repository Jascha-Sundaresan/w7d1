Pokedex.RootView.prototype.createPokemon = function (attrs, callback) {
  var that = this;
  var newPokemon = new Pokedex.Models.Pokemon();
  newPokemon.save(attrs, {
    success: function(){
      that.pokes.add(newPokemon);
      that.addPokemonToList(newPokemon);
      callback(newPokemon);
    }
  })
};

Pokedex.RootView.prototype.submitPokemonForm = function (event) {
  event.preventDefault();
  var $currentTarget = $(event.currentTarget);
  var formData = $currentTarget.serializeJSON();
  this.createPokemon(formData, this.renderPokemonDetail.bind(this));
};
