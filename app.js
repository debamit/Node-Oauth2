
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');

var BeerController = require('./controllers/beer');
var UserController = require('./controllers/user');
var AuthController = require('./controllers/auth');
var ClientController = require('./controllers/client');
var Oauth2Controller = require('./controllers/oauth2');
var AddressController = require('./controllers/address');

mongoose.connect('mongodb://localhost:27017/test');

var app = express();
// set view engine
app.set('view engine','ejs');

//initialize passport
app.use(passport.initialize());

var router = express.Router();

router.get('/', function(req, res){
	res.json({message : "Changes update in real time!"});
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'Super Secret Session Key',
  saveUninitialized: true,
  resave: true
}));

//address api endpoints
router.route('/addresses')
	.get(AddressController.getAddress)
	.post(AddressController.postAddress);

router.route('/addresses/:city')
	.get(AddressController.getAddressByCity);

// Create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
  .get(AuthController.isAuthenticated, Oauth2Controller.authorization)
  .post(AuthController.isAuthenticated, Oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .post(AuthController.isClientAuthenticated, Oauth2Controller.token);

router.route('/clients')
	.post(AuthController.isAuthenticated,ClientController.postClient)
	.get(AuthController.isAuthenticated,ClientController.getClients);

router.route('/beers')
	.post(AuthController.isAuthenticated,BeerController.postBeers)
	.get(AuthController.isAuthenticated,BeerController.getBeers);
	
router.route('/beers/:beer_id')
	.get(AuthController.isAuthenticated,BeerController.getBeerById)
	.put(AuthController.isAuthenticated,BeerController.updateBeerById);
	
router.route('/users')
	.post(UserController.postUser)
	.get(UserController.getUsers);

app.use('/api', router);
var port = 3000;

app.listen(port);

console.log("Node");