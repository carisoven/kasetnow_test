const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
    {
      shopname: {
        type: String,
      },
      adminshop: {
        type: String,
        required: true,
      },
      shopdetail: {
        type: String,
        required: true,
      },
      product: {
        productid: {type: mongoose.Schema.Types.ObjectId,ref: "shop",},
        productname:{type:mongoose.Schema.Types.String,ref:"shop"},
        maindetail:{type:mongoose.Schema.Types.String,ref:"shop"},
        price:{type:mongoose.Schema.Types.String,ref:"shop"}
      },
      
    },
    { timestamps: true }
  );
  
  module.exports = Shop = mongoose.model("product", ShopSchema);
  