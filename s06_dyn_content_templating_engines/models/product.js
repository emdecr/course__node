const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  // static keyword makes sure you can call this moethod directly on the class and not an instantiated object
  static fetchAll() {
    return products;
  }
};
