const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
    },
    maindetail: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    shop: {
        shopname:{type: mongoose.Schema.Types.ObjectId,ref: "shop",},
        adminshop:{type: mongoose.Schema.Types.String,ref:"shop"}
    },
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
