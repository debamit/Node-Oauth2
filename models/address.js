var mongoose = require('mongoose');

var AddressSchema = new mongoose.Schema({
	street1 : {type : String , unique : true, required : true},
	street2 : {type : String , unique : true, required : true},
	zip : {type : Number , required : true},
	city : {type : String , required : true},
	state : {type : String , required : true}
});

module.exports = mongoose.model ('Address', AddressSchema);