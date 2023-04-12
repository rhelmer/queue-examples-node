var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST API */
router.post('/api/v1/process', function(req, res, next) {
  console.debug('debug1', req.body)
  res.status(200).end()
});


module.exports = router;
