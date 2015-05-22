var Beer = require('../models/beer.js');

exports.postBeers = function(req, res){
		console.log(req.body.name);
	var beer = new Beer();
	
	beer.name = req.body.name;
	beer.type = req.body.type;
	beer.quantity = req.body.quantity;
	
	beer.save(function(err){
		if(err)
			res.send(err);
			
		res.json({message : 'Beer added to the locker', data : beer});
		});
};

exports.getBeers = function (req, res){
	Beer.find(function(err, beers){
		if(err)
		res.send(err);
		
		res.json(beers);
	});
};

exports.getBeerById = function (req, res){
	Beer.findById(req.params.beer_id,function(err, beer){
		if(err)
		res.send(err);
		
		res.json(beer);
	});
};

exports.updateBeerById = function(req, res){
	Beer.findById(req.params.beer_id,function(err, beer){
		if(err)
		res.send(err);
		
		beer.quantity = req.body.quantity;
		console.log(beer.quantity);
		beer.save(function(err){
			if(err)
			res.send(err);
			
			res.json(beer);
		});
		
	});
};
