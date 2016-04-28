//Necessary variables that for querying
var pg = require('pg');
var conString = process.env.DATABASE_CONNECTION_URL;

/*
*
* 
*
*/
exports.delphidata =  function (req, res) {
  var client = new pg.Client(conString);
  client.connect(function(err) {
      if (err) {
          console.error('could not connect to postgres', err);
      } else {
          console.log("Successfully connected to postgres")
      }

  });

  client.query("SELECT gender, number_of_respondents FROM cogs121_16_raw.cdph_smoking_prevalence_in_adults_1984_2013 WHERE year = 2013 ORDER BY number_of_respondents ASC",function(err,dat){
        client.end();
        console.log(dat);
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
}





exports.vehicle_availability = function (req, res) {
  var client = new pg.Client(conString);

  client.connect(function(err) {
      if (err) {
          console.error('could not connect to postgres', err);
      } else {
          console.log("Successfully connected to postgres")
      }

  });

  client.query("SELECT * FROM cogs121_16_raw.hhsa_san_diego_demographics_vehicle_availability_2012",function(err,dat){
        client.end();
        //console.log(err);
        res.json(dat.rows);
    });

  return { vehicle_availability: "No data present." }
}







exports.sd_college_locations = function (req, res) {
  var client = new pg.Client(conString);
  
  client.connect(function(err) {
      if (err) {
          console.error('could not connect to postgres', err);
      } else {
          console.log("Successfully connected to postgres")
      }

  });

  client.query("SELECT * FROM cogs121_16_raw.sandag_colleges_prj",function(err,dat){
        client.end();
        console.log(err);
        res.json(dat.rows);
    });

  return { sd_college_location: "No data present." }
}






exports.transportation_usage = function (req, res) {
  var client = new pg.Client(conString);
  
  client.connect(function(err) {
      if (err) {
          console.error('could not connect to postgres', err);
      } else {
          console.log("Successfully connected to postgres")
      }

  });

  client.query("SELECT * FROM cogs121_16_raw.hhsa_insurance_and_transportation_2012",function(err,dat){
        client.end();
        //console.log(err);
        res.json(dat.rows);
    });

  return { transportation_usage: "No data present." }
}