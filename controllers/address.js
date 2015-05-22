var Address = require('../models/address');

//saving address 
exports.postAddress = function (req, res) {
	var address = new Address();
	
	address.street1 = req.body.street1;
	address.street2 = req.body.street2;
	address.zip = req.body.zip;
	address.city = req.body.city;
	address.state = req.body.state;
	
	address.save(function(err){
		if(err)
		res.send(err);
		
		res.json(address);
	});
};

//getting address
exports.getAddress = function(req, res){
	Address.find(function(err, addresses){
		if(err)
		res.send(err);
		
		res.json(addresses);
	});
};

//getting address by city
exports.getAddressByCity = function(req, res){
	Address.findByCity(req.param.city , function(err, addresses){
		if(err)
		res.send(err);
		
		res.json(addresses);
	});
};