(function(d3) {
  "use strict";
  
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
  d3.json("https://raw.githubusercontent.com/leonlxli/Cogs121_P2_Uber/master/public/map/sdcounty.json",
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
        var layer = d3.select(this.getPanes().overlayLayer).append("div")
          .attr("class", "cities");

        var svg = layer.append("svg");
        var cities = svg.append("g").attr("class", "cityDiv");

        // Assigning random value to a city
        for (var i = 0; i < json.features.length; i++) {
          // Gets individual city objects
          // to get NAME: var SDcityName = json.features[i].properties.NAME;
          var SDcity = json.features[i];
          json.features[i].properties.VALUE = i;
          console.log(SDcity);
        }

          overlay.draw = function() {
            var projection = this.getProjection();

            var googleMapProjection = function(coord) {
              var googleCoord =  new google.maps.LatLng(coord[1], coord[0]);
              var pixCoord = projection.fromLatLngToDivPixel(googleCoord);
              return [pixCoord.x + 4000, pixCoord.y + 4000];
            }

            var path = d3.geo.path().projection(googleMapProjection);
            cities.selectAll("path")
              .data(json.features)
              .attr("d", path)
              .enter()
              .append("svg:path")
              .attr("d", path)
              .style("fill", function(d) {
                var val = d.properties.VALUE;
                return color(val/41); // return "#000000"; for no data
              })
              .style("stroke", "blue")
              .append("title")
              .text(function(d) {return d.properties.NAME;});

            // Changes color over hover; CURRENTLY NOT WORKING
            cities.selectAll("path")
              .on("mouseover", function(d) {
                console.log("WHY");
                d3.select(this)
                  .style("stroke", "black")
                  .style("fill", "red");
              })
              .on("mouseout", function(d) {
                console.log("Sigh.");
                d3.select(this)
                  .style("stroke", "blue")
                  .style("fill", function(d) {
                    var val = d.properties.VALUE;
                    return color(val/41);
                  });
              });  // End Hover-related shenanigans
            
          }; // END DRAW

      }; // END ON ADD

      overlay.setMap(map);
    }
  );

})(d3);
