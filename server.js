//dependencies for each module used
var express    = require('express');
var http       = require('http');
var path       = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session    = require('express-session');
var dotenv     = require('dotenv');
var pg         = require('pg');
var app        = express();
//client id and client secret here, taken from .env (which you need to create)
dotenv.load();

var router = { 
  /* TODO */
  query: require("./routes/query")
};
//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;
/*
// This only valid for querying one time.
var client = new pg.Client(conString);
client.connect(function(err) {
    if (err) {
        console.error('could not connect to postgres', err);
    } else {
        console.log("Successfully connected to postgres")
    }

});
*/

//Configures the Template engine
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat',
                  saveUninitialized: true,
                  resave: true}));

//set environment ports and start application
app.set('port', process.env.PORT || 3000);

//routes
app.get('/', function(req, res){
  res.render('index');
});

app.get('/form', function(req, res) {
  res.render('form');
});


//pgSQL Queryring
app.get('/delphidata', router.query.delphidata);
app.get('/vehicle_availability', router.query.vehicle_availability );
app.get('/sd_college_locations', router.query.sd_college_locations);
app.get('/transportation_usage', router.query.transportation_usage);
app.get('/max_vehicles', router.query.max_vehicles);
app.get('/ranks', router.query.ranks);




http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
