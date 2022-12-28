renderChart("Pie chart", "pieChart");

// set the dimensions and margins of the graph
var width = 450,
  height = 450,
  margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
var svg = d3
  .select("#pieChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.csv("../data.csv", function (rawData) {
  let totalValue = _.sumBy(rawData, (o) => o.percent * 1);
  let data = _.reduce(
    rawData,
    (acc, { states, percent }) => ({ ...acc, [states]: percent * 1 }),
    {}
  );
  // Compute the position of each group on the pie:
  var pie = d3.pie().value(function (d) {
    return d.value;
  });
  var data_ready = pie(d3.entries(data));
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", () => {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.5);

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
    .selectAll("mySlices")
    .data(data_ready)
    .enter()
    .append("text")
    .text(function (d) {
      let { key, value } = d.data;
      let percent = ((value / totalValue) * 100).toFixed(2);
      return "State " + key + " " + percent + "%";
    })
    .attr("transform", function (d) {
      return "translate(" + arcGenerator.centroid(d) + ")";
    })
    .style("text-anchor", "middle")
    .style("font-size", 17);
});
