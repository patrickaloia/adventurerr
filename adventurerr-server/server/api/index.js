const router = require('express').Router();

router.use('/party', require('./party'));
// router.use('/exercise')
router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;