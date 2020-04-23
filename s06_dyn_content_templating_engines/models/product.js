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
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile(products => {
      // Using an arrow fxn makes sure this refers to the class
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  // static keyword makes sure you can call this moethod directly on the class and not an instantiated object
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }
};
