// function Cat (attributes) {
//   this.attributes = attributes;
//   // this.id = this.attributes.id;
// };
//
// Cat.prototype.destroy = function () {
//   // ...
// };
//
// Cat.prototype.escape = function (name) {
//   return _.escape(this.get(name));
// };
//
// Cat.prototype.get = function (name) {
//   return this.attributes[name];
// };
//
// Cat.prototype.set = function (name, value) {
//   this.attributes[name] = value;
//   // this.id = this.attributes.id;
// };
//
// Cat.prototype.fetch = function () {
//   $.ajax({
//     type: "GET",
//     url: this.url(),
//     success: (function (attributes) {
//       this.attributes = attributes;
//     }).bind(this)
//   });
// };
//
// Cat.prototype.isNew = function () {
//   return this.get("id") === undefined;
// };
//
// Cat.prototype.save = function () {
//   if (this.isNew()) {
//     $.ajax({
//       type: "POST",
//       url: this.urlRoot,
//       // TODO: ???
//       data: { cat: this.attributes },
//       success: (function (attributes) {
//         this.attributes = attributes;
//       }).bind(this)
//     })
//   } else {
//     $.ajax({
//       type: "PATCH",
//       url: this.url(),
//       data: { cat: this.attributes },
//       success: (function (attributes) {
//         this.attributes = attributes;
//       }).bind(this)
//     });
//   }
// };
//
// Cat.prototype.url = function () {
//   return this.urlRoot + "/" + this.get("id");
// };
//
// Cat.prototype.urlRoot = "/cats";
//
// function Toy (attributes) {
//   ...
// }
//
// Toy.prototype.url = function () ...
