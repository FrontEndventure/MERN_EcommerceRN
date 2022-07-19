const {User} = require('../models/user');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get(`/`, async (req, res) => {
  const userList = await User.find();

  if (!userList) {
    res.status(500).json({success: false});
  }
  res.send(userList);
});

router.post('/', async (req, res) => {
  const {
    name,
    email,
    // passwordHash,
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  } = req.body;
  console.log('ini user input: ', req.body.password);
  let user = new User({
    name,
    email,
    passwordHash: bcrypt.hashSync(req.body.password,10),
    phone,
    isAdmin,
    street,
    apartment,
    zip,
    city,
    country,
  });
  user = await user.save();
  if (!user) return res.status(400).send('the user cannot be created');

  res.send(user);
});
module.exports = router;
