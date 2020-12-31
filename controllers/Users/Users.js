const router = require("express").Router();

const jwt = require("jsonwebtoken");
const administartion = require("../../models/administartion");


// get all  users
router.get("/getUser/", (req, res) => {
  token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      req.user = user;
      res.status(200).json({user: user._id})
    }
  });
});

module.exports = router;
