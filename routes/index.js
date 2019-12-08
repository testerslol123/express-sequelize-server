var express = require('express');
var router = express.Router();





// const itemModels = require('../models/item');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/items', function(req, res, next) {
	console.log('items');
	itemModels.findAll().then(items => {
		res.send(items);
	});
});

router.get('/items/:id', function(req, res, next) {
	itemModels.findOne({
		where: {
			id: req.params.id
		}
	}).then(items => {
		res.send(items);
	});
});




module.exports = router;
