const express = require('express');
const router = express.Router();

router.get("/carte", function(req, res) {
  res.send(require('./db_resto2.json'))
});
router.get("/order", function(req, res) {
  res.send(require('./order.json'))
});
module.exports = router;
