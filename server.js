//-----------------------------------------
//	Dependencies
//-----------------------------------------
var express		= require('express'),
	morgan		= require('morgan'),
	bodyParser = require('body-parser');

//-----------------------------------------
//	Setup the app
//-----------------------------------------
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

//-----------------------------------------
//	set the static files location
//-----------------------------------------
app.use(express.static(__dirname));

//-----------------------------------------
//	modules
//-----------------------------------------
app.use(morgan('dev'));	
app.use(bodyParser.urlencoded({
  extended: true
})); 

//-----------------------------------------
//	Router
//-----------------------------------------
router.get('/', function(req, res, next) {
	res.render('index.html');
});
app.use('/', router);


//-----------------------------------------
//	Initate app
//-----------------------------------------
app.listen(port);
console.log('App running on port', port);

