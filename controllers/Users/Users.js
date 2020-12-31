const router = require("express").Router();

const jwt = require("jsonwebtoken");
const administartion = require("../../models/administartion");

const admin = require("../../models/administartion");
const etd = require("../../models/Etudiant");
// var us = null;

async function getUser(user,res) {
  admin.findOne({ _id: user._id }, (err, rec) => {
    if (err) {
       res.status(500).json({ message: "user not found", err: err });
    } else {
      res.status(200).json({ user: rec });
      console.log(rec);
    }
  });
}

// get all  users
router.get("/getUser/", (req, res) => {
  token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      req.user = user;
      getUser(user,res);
    }
  });
});

module.exports = router;
