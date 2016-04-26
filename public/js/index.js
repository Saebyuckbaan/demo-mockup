(function($) {
  "use strict";
/*

  var data = [
    { name: "Lolita's", rating: 7.5 },
    { name: "Lucha Libre", rating: 8 },
    { name: "Puesto", rating: 9.5 },
    { name: "Rubio's", rating: 4 },
    { name: "Taco Bell", rating: 3 },
    { name: "Taco Stand", rating: 8.5 },
    { name: "Taco's, El Gordo", rating: 9 },
    { name: "Oscar's", rating: 9 },
    { name: "Rigoberto's", rating: 6 },
    { name: "Galaxy Taco", rating: 6.5 },
  ];


 
  // Defining the margins and chart size
  // See margin conventions for more information
  var margin = {top: 20, right: 10, bottom: 100, left: 40},
      width = 960 - margin.right - margin.left,
      height = 500 - margin.top - margin.bottom;

  var innerWidth  = width  - margin.left - margin.right;
  var innerHeight = height - margin.top  - margin.bottom;

  // TODO: Input the proper values for the scales
  var xScale = d3.scale.ordinal().domain(data).rangeRoundBands([0, width], 0.1);
  var yScale = d3.scale.linear().range([height, 0]);

  // Define the chart
  var chart = d3
                .select(".chart")
                .append("svg")
                .attr("width", width + margin.right + margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" +  margin.left + "," + margin.right + ")");

  // Render the chart
  xScale.domain(data.map(function (d){ return d.name; }));

  // TODO: Fix the yScale domain to scale with any ratings range
  yScale.domain([ 0, d3.max(data, function(d){ return d.rating; }  )]);

  // Note all these values are hard coded numbers
  // TODO:
  // 1. Consume the taco data
  // 2. Update the x, y, width, and height attributes to appropriate reflect this

  chart
    .selectAll(".bar")
    //.data([10, 20, 30, 40, 50, 60])
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    //.attr("x", function(d, i) { console.log( "%j " + i, d ); return i*( width / data_size ); })  // d is the data, i is the number
    .attr("x", function(d, i) { return xScale(d.name); } )
    .attr("width", xScale.rangeBand() )
    .attr("y", function(d) { return yScale(d.rating); })
    .attr("height", function(d) { return height-yScale(d.rating); });

  // Orient the x and y axis
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  // TODO: Append X axis
  chart
    .append("g")
    .attr("transform", "translate(0," + height +")")
    .call(xAxis)
    // This is selecting all "text" and give attributes 
    .selectAll("text")
    .attr("dy", "2em")
    .attr("dx", "-2em")
    .attr("x", "-1em")
    //.attr("y", "-2em")
    .attr("transform", "rotate(-45)");

  // TODO: Append Y axis
  chart
    .append("g")
    .call(yAxis);


  // ASSIGNMENT PART 1B
  // Grab the delphi data from the server
  d3.json("/delphidata", function( err, data )
  {

    console.log ( data );
    // Defining the margins and chart size
    // See margin conventions for more information
    var margin = {top: 10, right: 10, bottom: 100, left: 80},
        width = 960 - margin.right - margin.left,
        height = 500 - margin.top - margin.bottom;

    var innerWidth  = width  - margin.left - margin.right;
    var innerHeight = height - margin.top  - margin.bottom;

    // TODO: Input the proper values for the scales
    var xScale = d3.scale.ordinal().domain(data).rangeRoundBands([0, width], 0.1);
    var yScale = d3.scale.linear().range([height, 0]);

    // Define the chart
    var chart = d3
                  .select(".chart")
                  .append("svg")
                  .attr("width", width + margin.right + margin.left)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" +  margin.left + "," + margin.right + ")");

    // Render the chart
    xScale.domain(data.map(function (d){ return d.gender; }));

    // TODO: Fix the yScale domain to scale with any ratings range
    yScale.domain([ 0, d3.max(data, function(d){ return d.number_of_respondents; }  )]);

    // Note all these values are hard coded numbers
    // TODO:
    // 1. Consume the taco data
    // 2. Update the x, y, width, and height attributes to appropriate reflect this

    chart
      .selectAll(".bar")
      //.data([10, 20, 30, 40, 50, 60])
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d, i) { console.log( "%j " + i, d ); return i*( width / data_size ); })  // d is the data, i is the number
      .attr("x", function(d, i) { return xScale(d.gender); } )
      .attr("width", xScale.rangeBand() )
      .attr("y", function(d) { return yScale(d.number_of_respondents); })
      .attr("height", function(d) { return height-yScale(d.number_of_respondents); });

    // Orient the x and y axis
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    // TODO: Append X axis
    chart
      .append("g")
      .attr("transform", "translate(0," + height +")")
      .call(xAxis)
      // This is selecting all "text" and give attributes 
      .selectAll("text")
      .attr("dy", "2em")
      .attr("dx", "-2em")
      .attr("x", "-1em")
      //.attr("y", "-2em")
      .attr("transform", "rotate(-45)");

    // TODO: Append Y axis
    chart
      .append("g")
      .call(yAxis);
  });



  //Call map to draw the map
  map();  
*/

  

})($);


function map ( ){
  var width = 700,
      height = 580;

  var svg = d3.select( "body" )
    .append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

  var neighborhoods = svg.append( "g" );
  var g = svg.append( "g" );

  var albersProjection = d3.geo.albers()
    .scale( 190000 )
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate( [width/2,height/2] );

  var geoPath = d3.geo.path()
      .projection( albersProjection );

  g.selectAll( "path" )
    .data( neighborhoods_json.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#ccc" )
    .attr( "d", geoPath );
  };