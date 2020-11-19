const express = require("express");
const router = express.Router();
const { check } = require("express-validator");



//Middleware
const auth = require("../../middleware/auth");
//DB Schema
const User = require("../../Models/User");
const Post = require("../../Models/Post");

// route    POST api/social/post
// Mypost
router.post(
  "/",
  [auth, [check("postowner", "Post Is Empty").not().isEmpty()]],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = new Post({
        postowner: { uid: user.id, name: user.name },
        postdetail: req.body.postdetail,
        postpic: req.body.postpic,
      });
      const postshow = await post.save();
      res.json(postshow);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//route POST api/social/comment
//Comment On My Post

router.post(
  "/comment",
  [
    auth,
    [
      check("postowner", "Who is Post or Comment").not().isEmpty(),
      check("postcomment", "Comment Is Empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const {postid,comment }= req.body ;
      const postid2 = await Post.findById(postid);
      const comment2 = {
        comment : comment
      }
      let postcomment = await Post.findOneAndUpdate(
        { _id: postid2._id },
        { $set: comment2 },
        { new: true }
      );
      res.json(postcomment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/profile",
  [
    auth,
    [
      check("lives", "lives is empty").not().isEmpty(),
      check("tel", "Phone Is Empty").not().isEmpty(),
      check("email", "Email Is Empty").not().isEmpty(),
      check("website", "Website Is Empty").not().isEmpty(),
      check("gender", "Gender Is Empty").not().isEmpty(),
      check("dateofbirth", "Date of Birth Is Empty").not().isEmpty(),
      check("religious", "Religious Is Empty").not().isEmpty(),
      check("aboutyou", "aboutyou Is Empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const {
        lives,
        tel,
        email,
        website,
        gender,
        dateofbirth,
        religious,
        aboutyou,
      } = req.body;
      const allinfo = {
        profile:{
        information: { lives: lives, tel: tel, email: email, website: website },
        about: {
          gender: gender,
          dateofbirth: dateofbirth,
          religious: religious,
          aboutyou: aboutyou,
        },}
      };
    

      let userprofile = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: allinfo },
        { new: true }
      );
      res.json(userprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
