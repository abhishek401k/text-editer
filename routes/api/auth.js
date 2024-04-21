const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const authMid = require('../../middleware/authMid');

//  POST
//  api/auth
//  login user || get token in res
//  public
router.post('/', [
  check('email', 'Please include a valid email to login').isEmail(),
  check('password', 'Please include a valid password to login').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('Invalid Credentials');
    }

    // @ts-ignore
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).send('Invalid Credentials');
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
  }
});


//  GET
//  api/auth
//  send token in header || get user info
//  public
router.get('/', authMid, async (req, res) => {
  try {
    // @ts-ignore
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;