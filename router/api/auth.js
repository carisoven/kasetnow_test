const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check,validationResult} = require("express-validator")
require("dotenv").config();
const router = express.Router();
//Middleware
const auth = require("../../middleware/auth");
//DB Schema
const User = require("../../Models/User");


// route    GET api/auth
// Get user by token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router  POST api/auth/signup
// Register User
router.post(
  "/signup",
  [
    check("name", "Please include a valid Name").not().isEmpty(),
    check("username", "Please include a valid Username").not().isEmpty(),
    check("uid", "Please include a valid ID").not().isEmpty(), 
    check("password","please enter a Password with 6 or more characters").isLength({ min: 6 }),
    check("role", "Please select Permission").not().isEmpty()
  ],
   async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, password, uid, role } = req.body; 

    try {
       let user = await User.findOne({ username });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        username,
        password,
        uid,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token: token,
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
              role: user.role,
            },
          });
        } 
      ); 
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// router  POST api/auth/login
// Authentication user & get Token (Login)
router.post(
    "/login",
    [
      check("username", "please include a valid username").not().isEmpty(),
      check(
        "password",
        "please enter a password with 6 or more characters"
      ).exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, password } = req.body;
      try {
        let user = await User.findOne({ username });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Username and Password is wrong" }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Username and Password is wrong" }] });
        }
  
        const payload = {
          user: {
            id: user.id
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token: token,
              user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
              },
            });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );


module.exports = router;
