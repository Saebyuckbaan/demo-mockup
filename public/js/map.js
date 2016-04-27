(function(d3) {
  "use strict";



  // //vehicle_availability
  // d3.json("/vehicle_availability", function( err, data )
  // {
  //   console.log ( data );
  // });

  // //sd college locations
  // d3.json("/sd_college_locations", function( err, data )
  // {
  //   console.log ( data );
  // });

  // //transportation_usage in San Diego
  // d3.json("/transportation_usage", function( err, data )
  // {
  //   console.log ( data );
  // });






  // Google Map
  var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 9,
    minZoom: 6,
    center: new google.maps.LatLng(33.0157, -116.8611),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Colors for the values; currently gives arbitrary colors
  var color = d3.scale.quantize()
    .range(["#ffffd9","#edf8b1","#c7e9b4",
            "#7fcdbb","#41b6c4","#1d91c0",
            "#225ea8","#253494","#081d58"]);

  // JSON-related
  d3.json("../json/zillowneighborhoodsca.geojson",
    function(error, json) {
      // if an error occurs, THROW AN ERROR
      if (error) {
        console.error(error);
        throw error;
      }

      // prints all objects in the json file
      // console.log(json);

      // Creates the overlay
      var overlay = new google.maps.OverlayView();

      overlay.onAdd = function() {
        var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
          .attr("class", "cities");

        var svg = layer.append("svg");
        var cities = svg.append("g").attr("class", "cityDiv");

        // Assigning random value to a city
        for (var i = 0; i < json.features.length; i++) {
          // Gets individual city objects
          // to get NAME: var SDcityName = json.features[i].properties.NAME;
          var SDcity = json.features[i];
          json.features[i].properties.VALUE = i;
          //console.log(SDcity);
        }

          overlay.draw = function() {
            var projection = this.getProjection();

            var googleMapProjection = function(coord) {
              var googleCoord =  new google.maps.LatLng(coord[1], coord[0]);
              var pixCoord = projection.fromLatLngToDivPixel(googleCoord);
              return [pixCoord.x + 4000, pixCoord.y + 4000];
            }

            var path = d3.geo.path().projection(googleMapProjection);
            
            $.get("/vehicle_availability", function(data) {

                // Represent the colors specturm of the data
                // where between red and blue represent the availablity of the car
                var colorPallete = 
                ["#37cebc",
                "#46c2b7",
                "#54b7b1",
                "#63abac",
                "#729fa7",
                "#8093a2",
                "#8f879d",
                "#9e7c97",
                "#ac7092",
                "#bb648d",
                "#ca5887",
                "#d84d82",
                "#e7417d"];

                // Modify the data to our format, probably better to do it on the back end later
                var newData = {};
                // contain the array of our numbers of car total
                var dataArray = [];

                for (var i = 0; i < data.length; i++) {
                    var propName = data[i].Area.toLowerCase();
                    newData[propName] = data[i];
                    dataArray.push(data[i]["no vehicle available"]);
                }

                // Linear scale to turn our car availability number into car
                // find a different scale or get a large specturm of colors instead of 10
                // possibly use 
                var linearScale = d3.scale.linear();
                    linearScale.domain([d3.min(dataArray, function(d) {return d;}),6000]);
                    linearScale.range(colorPallete);


              cities.selectAll("path")
                .data(json.features)
                .attr("d", path)
                .enter()
                .append("svg:path")
                .attr("d", path)
                .style("fill", function(d) {
                    if (newData[d.properties.NAME.toLowerCase()]) {
                        if (newData[d.properties.NAME.toLowerCase()][["no vehicle available"]] > 6000) {
                            // green represents counties in our set with extreme values
                            return "green";
                        }

                        // generate a color spectrum which doesn't currently work yet. 
                        return linearScale(newData[d.properties.NAME.toLowerCase()][["no vehicle available"]]);
                    }
                    else {
                        // Red represents counties not in our dataset
                        return "red";
                    }
                })
                .style("stroke", "blue")
                .append("title")
                .text(function(d) {return d.properties.NAME;});

              // TODO 
              // Need to modify the hover methods because they change the color of the counties
              // from the original they were assign in the above function call. 


              // Changes color over hover; CURRENTLY NOT WORKING
              cities.selectAll("path")
                .on("mouseover", function(d) {
                  //console.log("WHY");
                  d3.select(this)
                    .style("stroke", "black")
                    .style("fill", "#E57373");
                })
                .on("mouseout", function(d) {
                  //console.log("Sigh.");
                  d3.select(this)
                    .style("stroke", "blue")
                    .style("fill", function(d) {
                      var val = d.properties.VALUE;
                      return color(val/41);
                    });
                });  // End Hover-related shenanigans

            });


          }; // END DRAW

      }; // END ON ADD

      overlay.setMap(map);
    }
  );

})(d3);

