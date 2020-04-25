const db = require("../util/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageURL, price, description) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.price = parseInt(price);
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageURL, description ) VALUES (?,?,?,?)",
      [this.title, this.price, this.imageURL, this.description]
    );
  }

  // static keyword makes sure you can call this moethod directly on the class and not an instantiated object
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findProductById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static editProduct(id, updatedProductInfo) {}

  static deleteProduct(id) {}
};
