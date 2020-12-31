const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }else{
          next();
        }
        

    });
};
//TODO VERFIE  TOKEN  WITH ACCESS