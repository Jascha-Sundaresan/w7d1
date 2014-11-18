// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

// parse/association methods...

var _ = {};
_.result = function (object, propertyName) {
  var value = object[propertyName];
  if (typeof value !== "function") {
    return value;
  } else {
    return value.call(object);
  }
};

function Model (attributes) {
  throw "Don't call me!";
};

Model.extend = function (protoProps) {
  function ModelSubclass (attributes, options) {
    options = options || {};

    if (options.parse) {
      this.attributes = this.parse(attributes);
    } else {
      this.attributes = attributes;
    }
  };

  function surrogate () {};
  surrogate.prototype = Model.prototype;
  ModelSubclass.prototype = new surrogate();

  for (key in protoProps) {
    ModelSubclass.prototype[key] = protoProps[key];
  }

  return ModelSubclass;
};

Model.prototype.destroy = function () {
  // ...
};

Model.prototype.escape = function (name) {
  return _.escape(this.get(name));
};

Model.prototype.get = function (name) {
  return this.attributes[name];
};

Model.prototype.parse = function (attributes) {
  return attributes;
};

Model.prototype.set = function (name, value) {
  this.attributes[name] = value;
  // this.id = this.attributes.id;
};

Model.prototype.fetch = function () {
  $.ajax({
    type: "GET",
    url: this.url(),
    success: (function (attributes) {
      this.attributes = this.parse(attributes);
    }).bind(this)
  });
};

Model.prototype.isNew = function () {
  return this.get("id") === undefined;
};

Model.prototype.save = function () {
  if (this.isNew()) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: this.urlRoot,
      // TODO: ???
      data: this.attributes,
      success: (function (attributes) {
        this.attributes = attributes;
      }).bind(this)
    })
  } else {
    $.ajax({
      type: "PATCH",
      dataType: "json",
      url: this.url(),
      data: this.attributes,
      success: (function (attributes) {
        this.attributes = attributes;
      }).bind(this)
    });
  }
};

Model.prototype.toJSON = function () {
  return this.attributes;
};

Model.prototype.url = function () {
  return this.urlRoot + "/" + this.get("id");
};


window.Collection = function () {
  throw "Don't call me";
};

Collection.extend = function (protoProps) {
  function CollectionSubclass (models, options) {
    this.models = models;
    if (this.initialize) {
      this.initialize(models, options);
    }
  };

  function surrogate () {};
  surrogate.prototype = Collection.prototype;
  CollectionSubclass.prototype = new surrogate();

  for (key in protoProps) {
    CollectionSubclass.prototype[key] = protoProps[key];
  }

  return CollectionSubclass;
};

Collection.prototype.add = function (pojos) {
  // array of POJOs
  pojos.forEach((function (pojo) {
    this.models.push(new this.model(pojo));
  }).bind(this))
};

Collection.prototype.fetch = function () {
  $.ajax({
    type: "GET",
    url: _.result(this, "url"),
    success: (function (data) {
      this.models = [];
      data.forEach((function (attributes) {
        this.models.push(
          new this.model(attributes, { parse: true })
        );
      }).bind(this));
    }).bind(this)
  });
};

Collection.prototype.forEach = function (fn) {
  // this.models.forEach(fn);
  _.each(this.models, fn);
};

Collection.prototype.get = function (id) {
  for (var i = 0; i < this.models.length; i++) {
    if (this.models[i].get("id") == id) {
      return this.models[i];
    }
  }

  return null;
};

Collection.prototype.length = function () {
  return this.models.length;
};

Collection.prototype.toJSON = function () {
  return this.models.map(function (model) { return model.toJSON() });
};

// APPLICATION CODE

window.Cat = Model.extend({
  urlRoot: "/cats",

  meow: function () {
    console.log(this.get("name") + " says meow!");
  },

  // association method
  favoriteFoods: function () {
    if (!this._favoriteFoods) {
      this._favoriteFoods = new CatFavoriteFoods([], { cat: this });
    }
    return this._favoriteFoods;
  },

  parse: function (json) {
    if (json.favorite_foods) {
      this.favoriteFoods().add(json.favorite_foods);
      delete json.favorite_foods
    }

    return json;
  }
});

window.FavoriteFood = Model.extend({
  urlRoot: "/favorite_foods"
});

window.CatFavoriteFoods = Collection.extend({
  model: FavoriteFood,
  initialize: function (models, attributes) {
    this.cat = attributes.cat;
  },

  url: function () {
    return this.cat.url() + "/favorite_foods";
  }
});

window.OldCats = Collection.extend({
  model: Cat,

  initialize: function (models, options) {
    this.minAge = options.minAge;
  },

  url: function () {
    return "/cats?min_age=" + this.minAge;
  }
});
//
// window.YoungCats = Collection.extend({
//   model: Cat,
//   url: "/cats?max_age=5"
// });

var kitten =  Cat({ id: 1 });
kitten.fetch();
// GET /cats/1/favorite_foods
// kitten.favoriteFoods().fetch();

var oldCats = new OldCats([], { minAge: 5 });
var veryOldCats = new OldCats([], { minAge: 50 });
//
// oldCats.fetch();
// veryOldCats.fetch();
