const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  //lets validate before we make a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  ///check if the user is in already in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exists");

  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  ///create new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    todos: [],
  });
  try {
    console.log("new user");
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

///login
router.post("/login", async (req, res) => {
  //lets validate before we make a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  ///check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("no such email");
  // password is correct?
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("password is wrong");
  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const data = {
    token: token,
    user: {email: user.email, todos: user.todos},
  };

  console.log(data);

  res.header("auth-token", token).send(data);

});

module.exports = router;
