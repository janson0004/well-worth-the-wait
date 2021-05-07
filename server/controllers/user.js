const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// API for signing up, requires username and password in body
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

// API for user login, requires username and password in body
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

// API for user logout
exports.user_logout = (req, res, next) => {
  res.status(202).clearCookie("token").json({
    message: "Logged out",
  });
};

// API for getting specific user info
exports.user_info = (req, res, next) => {
  User.findById(req.userData.userId)
    .populate("fav_place")
    .then((user) => {
      res.status(200).json(user);
    })

    .catch((err) => {
      res.status(500).end(err);
    });
};

// API for getting all users info
exports.all_user_info = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
};

// API for updating user
exports.user_update = (req, res, next) => {
  User.findById(req.body.userId)
    .then((user) => {
      if (req.body.username != null) {
        user.username = req.body.username;
      }
      if (req.body.password != null) {
        user.password = req.body.password;
      }
      user.save().then(() => {
        res.status(200).end("User updated");
      });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
};

exports.user_delete = (req, res, next) => {
  User.findByIdAndDelete(req.body.userId)
    .then(() => {
      res.status(200).end("User deleted");
    })
    .catch((err) => {
      res.status(500).end(err);
    });
};
