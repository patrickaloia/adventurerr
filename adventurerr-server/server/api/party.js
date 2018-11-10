
const { User } = require('../db/models');
const router = require('express').Router();
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});