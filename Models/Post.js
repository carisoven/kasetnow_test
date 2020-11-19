const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    postowner: {
      uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: mongoose.Schema.Types.String,
        ref: "user",
      },
    },
    postdetail: {
      type: String,
      required: true,
    },
    postpic: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
    },
    // product: {
    //   productid: {type: mongoose.Schema.Types.ObjectId,ref: "shop",},
    //   productname:{type:mongoose.Schema.Types.String,ref:"shop"},
    //   maindetail:{type:mongoose.Schema.Types.String,ref:"shop"},
    //   price:{type:mongoose.Schema.Types.String,ref:"shop"}
    // },
  },
  { timestamps: true }
);

module.exports = Post = mongoose.model("post", PostSchema);
