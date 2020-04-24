const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static getCart(callBack) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        callBack(null);
      } else {
        callBack(cart);
      }
    });
  }

  static addProduct(id, productPrice) {
    //   Fetch existing cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze car => check if product exists
      const existingProductIndex = cart.products.findIndex(p => p.id == id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //   Add new product/increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + productPrice;
      // If the price was still stored as a string, you can add a + in front
      //   of the productPrice variable to add it as an int
      // ie => cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      } else {
        return;
      }
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(product => product.id == id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        product => product.id != id
      );
      updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log("deleteProduct errors", err);
      });
    });
  }
};
