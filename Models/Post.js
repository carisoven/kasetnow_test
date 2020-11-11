const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
      postowner: {
        type:mongoose.Schema.Types.ObjectId,ref:"user"
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
  
  module.exports = Post = mongoose.model("post", PostSchema);
  