const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);

// const mongoConnect = require("../util/database").mongoConnect;
// const getDB = require("../util/database").getDB;
// const mongoDB = require("mongodb");

// class Product {
//   constructor(title, price, imageURL, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageURL = imageURL;
//     this.description = description;
//     this._id = id ? new mongoDB.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDB();
//     let dbOps;
//     if (this._id) {
//       dbOps = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOps = db.collection("products").insertOne(this);
//     }
//     return dbOps
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find() // find() returns a cursor
//       .toArray()
//       .then(products => {
//         // console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .find({ _id: new mongoDB.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDB();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongoDB.ObjectId(prodId) })
//       .then(result => {
//         console.log("DELETED!");
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
