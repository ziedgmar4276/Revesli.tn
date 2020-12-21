const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = require("express").Router();

dotenv.config();
const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `"ziedgmar", "ziedgmar242@gmail.com"`,
    to: `${user.email}`,
    subject: "Confirmation",
    html: `<h1>it's work</h1><br>,`,
  };
  transporter.sendMail(mailOptions, callback);
};
router.post("/send/:id", (req, res) => {
  console.log("request came");!
  sendMail(order, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.status(200).json({ message: info });
    }
  });
});
//TODO VERFICATION WITH EMAIL  AND  SEND  EMAIL  CONFERMATION
module.exports = router;