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




  var strictBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(32.492908, -117.710885),
    new google.maps.LatLng(33.352841, -116.165932)
  );

  // Google Map
  var map = new google.maps.Map(d3.select("#map").node(), {
    zoom: 9,
    minZoom: 9,
    maxZoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    center: new google.maps.LatLng(32.9185, -117.1382),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  google.maps.event.addListener(map, 'dragend', function() {
     if (strictBounds.contains(map.getCenter())) return;

     // We're out of bounds - Move the map back within the bounds

     var c = map.getCenter(),
         x = c.lng(),
         y = c.lat(),
         maxX = strictBounds.getNorthEast().lng(),
         maxY = strictBounds.getNorthEast().lat(),
         minX = strictBounds.getSouthWest().lng(),
         minY = strictBounds.getSouthWest().lat();

     if (x < minX) x = minX;
     if (x > maxX) x = maxX;
     if (y < minY) y = minY;
     if (y > maxY) y = maxY;

     map.setCenter(new google.maps.LatLng(y, x));
   });

  // Colors for the values; currently gives arbitrary colors
  var color = d3.scale.quantize()
    .domain([0, 0.1])
    .range([
      "#ffffd9",
      "#edf8b1",
      "#7fcdbb",
      "#7fcdbb",
      "#41b6c4",
      "#1d91c0",
      "#225ea8",
      "#253494",
      "#081d58",]);

  // JSON-related
  d3.json("../json/sdcounty.json",
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

                var endData = "san diego county";

                // We're interested in the number of people without transportation
                var target = "no vehicle available";

                var totals = "total households (occupied housing units)";

                for (var i = 0; i < data.length; i++) {
                    var propName = data[i].Area.toLowerCase();
                    newData[propName] = data[i];
                    newData[propName]["ratio"] = newData[propName][target]/newData[propName][totals];
                    console.log(newData[propName]["ratio"]);
                    dataArray.push(data[i]["no vehicle available"]);
                    //console.log(dataArray[i]);
                }

                // Linear scale to turn our car availability number into car
                // find a different scale or get a large specturm of colors instead of 10
                // possibly use
                /*
                var threshold = d3.scale.threshold()
                  .domain(dataArray)
                  .range(colorbrewer.RdBu[9]);
                  */
                var linearScale = d3.scale.linear();
                    linearScale.domain([d3.min(dataArray, function(d) {return d;}),6000]);
                    linearScale.range(colorPallete);

              cities.selectAll("path")
                .data(json.features)
                .attr("d", path)
                .enter()
                .append("svg:path")
                .attr("d", path)
                .style("fill", function(d, i) {
                  return color(newData[d.properties.NAME.toLowerCase()]["ratio"]);
                })
                .style("stroke", function(d, i){
                  return "#222";
                })
                .append("title")
                .text(function(d) {return d.properties.NAME;});

              cities.append("g")
                .attr("class", "legendL")
                .attr("transform", "translate(20, 20)");

              var legendLinear = d3.legend.color()
                .shapeWidth(30)
                .orient('horizontal')
                .scale(linearScale);

              cities.select(".legendL")
                .call(legendLinear);

              // Changes color over hover; CURRENTLY NOT WORKING
              cities.selectAll("path")
                .on("mouseover", function(d) {
                  var name = d.properties.NAME.toLowerCase();
                  if (newData[name]) {
                    $(".data > .label1").text("Number of Households Who Don't Have Vehicles Available: ");
                    $(".data > .label2").text("Households Available: ");

                    $(".data > .info").text(newData[name].Area);
                    $(".data > .data1").text(newData[name]["no vehicle available"]);
                    $(".data > .data2").text(newData[name]["total households (occupied housing units)"]);

                  }
                })
                .on("mouseout", function(d) {
                  $(".data > .label1").text("");
                  $(".data > .label2").text("");

                  $(".data > .info").text("");
                  $(".data > .data1").text("");
                  $(".data > .data2").text("");

                });  // End Hover-related shenanigans

                console.log("data: " + data[0].Area + "other stuff: " + data[0]["no vehicle available"]);

            });

          }; // END DRAW

      }; // END ON ADD

      overlay.setMap(map);
    }
  );

})(d3);
