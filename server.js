//dependencies for each module used
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var pg = require('pg');
var app = express();

//client id and client secret here, taken from .env (which you need to create)
dotenv.load();

//connect to database
var conString = process.env.DATABASE_CONNECTION_URL;
var client = new pg.Client(conString);
client.connect(function(err) {
    if (err) {
        console.error('could not connect to postgres', err);
    } else {
        console.log("Successfully connected to postgres")
    }
});

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

app.get('/map', function(req, res){
  res.render('map');
});

app.get('/delphidata', function (req, res) {
  /*
  client.query("SELECT gender, number_of_respondents FROM cogs121_16_raw.cdph_smoking_prevalence_in_adults_1984_2013 WHERE year = 2013 ORDER BY number_of_respondents ASC",function(err,dat){
        client.end();
        res.json(dat.rows);
    });
*/
  client.query("SELECT \"Area\", \"Population\" FROM cogs121_16_raw.hhsa_san_diego_demographics_county_popul_by_age_2012_norm a WHERE \"Age\" = ( SELECT \"Age\" FROM cogs121_16_raw.hhsa_drink_driver_mot_vehicle_crashes_by_age_2010_2011 WHERE \"MVC Rate\" = ( SELECT MAX(\"MVC Rate\") FROM cogs121_16_raw.hhsa_drink_driver_mot_vehicle_crashes_by_age_2010_2011)) AND \"Population\" > ( SELECT AVG(\"Population\") FROM cogs121_16_raw.hhsa_san_diego_demographics_county_popul_by_age_2012_norm);",function(err,dat){
        res.json(dat.rows);
    });

  // TODO
  // Connect to the DELPHI Database and return the proper information
  // that will be displayed on the D3 visualization
  // Table: Smoking Prevalance in Adults
  // Task: In the year 2003, retrieve the total number of respondents
  // for each gender.
  // Display that data using D3 with gender on the x-axis and
  // total respondents on the y-axis.
  return { delphidata: "No data present." }
});


http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
