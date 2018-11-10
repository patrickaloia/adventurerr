
const { Party } = require('../db/models');
const router = require('express').Router();
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const party = await Party.findAll();
    res.json(party);
  } catch (err) {
    console.log(err);
  }
});