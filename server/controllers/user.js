const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// API for signing up, requires email, username, email, password in body
exports.user_signup = (req, res, next) => {
  User.findOne({ username: req.body.username }).then((exist) => {
    if (exist != null) {
      return res.status(409).json({
        message: "Duplicate Email",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
            message: "Hashing failed",
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            role: "User",
            username: req.body.username,
            password: hash,
          });
          user
            .save()
            .then((result) => {
              res.status(201).json({
                message: "User created",
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: err,
                message: "Database error",
              });
            });
        }
      });
    }
  });
};

// API for user login, requires email and password in body
exports.user_login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({
          message: "User does not exist",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userId: user._id,
            },
            process.env.JWT_TOKEN
            //{
            //expiresIn: "1h"
            //}
          );
          return res
            .status(200)
            .cookie("token", token, {
              sameSite: "strict",
              path: "/",
              expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              httpOnly: true,
              // secure: true,
            })
            .send("Logged in");
        }
        res.status(401).json({
          message: "Incorrect password",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

// API for getting specific user info
exports.user_info = (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      res.status(200).json(user);
    })

    .catch((err) => {
      res.status(500).end(err);
    });
};
