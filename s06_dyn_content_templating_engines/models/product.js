const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = callBack => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callBack([]);
    } else {
      callBack(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageURL, price, description) {
    this.id = id;
    this.title = title;
    this.imageURL = imageURL;
    this.price = parseInt(price);
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      // Using an arrow fxn makes sure this refers to the class
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log("getProductsFromFile errors", err);
      });
    });
  }

  // static keyword makes sure you can call this moethod directly on the class and not an instantiated object
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  static findProductById(id, callBack) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id);
      callBack(product);
    });
  }

  static editProduct(id, updatedProductInfo) {
    //   Fetch existing products
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      // Check if product exists
      const existingProductIndex = products.findIndex(
        product => product.id == id
      );
      const existingProduct = products[existingProductIndex];
      //   Add new product/increase quantity
      let updatedProducts;
      if (existingProduct) {
        updatedProducts = [...products];
        updatedProducts[existingProductIndex] = updatedProductInfo;
        console.log("changes");
      } else {
        updatedProducts = [...products];
        console.log("no changes");
      }
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log("editProduct errors", err);
      });
    });
  }

  static deleteProduct(id) {
    //   Fetch existing products
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      // Check if product exists
      const existingProductIndex = products.findIndex(
        product => product.id == id
      );
      const existingProduct = products[existingProductIndex];
      // Delete product
      let updatedProducts;
      if (existingProduct) {
        updatedProducts = [...products];
        updatedProducts.splice(existingProductIndex, 1);
        console.log("deleted");
      } else {
        updatedProducts = [...products];
        console.log("no deletions");
      }
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log("deleteProduct errors", err);
      });
    });
  }
};
