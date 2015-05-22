var Client = require('../models/client');

exports.postClient = function(req, res){
	var client 	= new Client();
	console.log(req);
	client.name = req.body.name;
	client.id = req.body.id;
	client.secret = req.body.secret;
	client.userId = req.user._id;
	
	client.save(function(err){
		if(err) 
		res.send(err);
		res.json(client);
	});
};

exports.getClients = function (req, res) {
	Client.find({userId : req.user._id},function(err, clients){
		if(err)
		res.send(err);
		
		res.json(clients);
	});	
};
