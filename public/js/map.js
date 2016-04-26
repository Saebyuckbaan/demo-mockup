(function(d3) {
  "use strict";

  

  var width = 1200;
  var height = 800;
  var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

  var color = d3.scale.quantize()
                    .range(["rgb(237,248,233)", "rgb(186,228,179)",
                     "rgb(116,196,118)", "rgb(49,163,84)","rgb(0,109,44)"]);

  d3.json("https://raw.githubusercontent.com/leonlxli/Cogs121_P2_Uber/master/public/map/sdcounty.json",
    function(json) {
      console.log(json);

      var center = d3.geo.centroid(json);
      var scale = 25000;
      var offset = [width/2, height/2];
    
      var projection = d3.geo.mercator()
        .scale(scale)
        .center(center)
        .translate(offset);
      var path = d3.geo.path().projection(projection);
      var bounds = path.bounds(json);

      for (var i = 0; i < json.features.length; i++) {
        // Gets individual city objects
        // to get NAME: var SDcityName = json.features[i].properties.NAME;
        var SDcity = json.features[i];
        json.features[i].properties.VALUE = i;
        console.log(SDcity);
      }

      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function(d) {
          var val = d.properties.VALUE;
          return color(val/100);
        })
        .style("stroke", "blue")
        .append("title")
        .text(function(d) {return d.properties.NAME;});

        svg.selectAll("path")
        .on("mouseover", function(d) {
          console.log(d);
          d3.select(this)
            .style("stroke", "black")
            .style("fill", "red");
        })
        .on("mouseout", function(d) {
          console.log(d);
          d3.select(this)
            .style("stroke", "blue")
            .style("fill", function(d) {
              var val = d.properties.VALUE;
              return color(val/100);
            });
        });
    }
  );

})(d3);
