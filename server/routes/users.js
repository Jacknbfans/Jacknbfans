var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id: 1,
    name: "yujiro11"
  }, {
    id: 2,
    name: "yuziro22"
  }]);
});

module.exports = router;
