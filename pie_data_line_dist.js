var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

//color values to be mapped to the domain
var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

// Constructs a new arc generator with the default innerRadius-, outerRadius-, startAngle- and endAngle-accessor functions
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

//The pie layout simply makes it easier to convert an array of data into an array of objects with startAngle and
//endAngle attributes that range from 0 to 2π, which you can then pass to the arc shape generator.
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.Access; });

//appending a super group to the svg and translating it left 
var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//obtaining data from csv file
d3.csv("fixed_line_dist.csv", function(error, data) {

  data.forEach(function(d) {
    d.Access = +d.Access;
  });
 
//creating groups with arc class that are bounnd to the data
  var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");
//The path element represents the outline of a shape which can be filled, stroked, used as a clipping path, or any combination of the three. The
//arc variable contains definitions for the path  
  g.append("path")
      .attr("d", arc)
	  .style("stroke", function(d){
		  return color(d.data.Tech);
		  })
      .style("fill", function(d) { 
	  console.log("checking d : "+ d.data.Access);
	  return color(d.data.Tech);
	   });

  g.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.Tech; });

});