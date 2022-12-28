renderChart("Circulars chart", "circular-packing");

// set the dimensions and margins of the graph
var width = 450,
  height = 450,
  radius = 50;
// append the svg object to the body of the page
var svg = d3
  .select("#circular-packing")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("../data.csv", function (data) {
  console.log("data: ", data);
  // create a tooltip
  var Tooltip = d3
    .select("#circular-packing")
    .append("p")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px");

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function (d) {
    Tooltip.style("opacity", 1);
  };
  var mousemove = function (d) {
    console.log("first");
    Tooltip.html("<u>" + d.states + "</u>" + "<br>" + d.percent + "%")
      .style("left", d3.mouse(this)[0] + 20 + "px")
      .style("top", d3.mouse(this)[1] + "px");
  };
  var mouseleave = function (d) {
    Tooltip.style("opacity", 0);
  };

  // Initialize the circle: all located at the center of the svg area
  var node = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", ({ percent }) => {
      return percent;
    })
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .style("fill", () => {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    })
    .attr("stroke", "black")
    .style("stroke-width", 2)
    .on("mouseover", mouseover) // What to do when hovered
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
    .call(
      d3
        .drag() // call specific function when circle is dragged
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

  // Features of the forces applied to the nodes:
  var simulation = d3
    .forceSimulation()
    .force(
      "center",
      d3
        .forceCenter()
        .x(width / 2)
        .y(height / 2)
    ) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(0.1).radius(30).iterations(1)); // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation.nodes(data).on("tick", function (d) {
    node
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
  });

  // What happens when a circle is dragged?
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0.03);
    d.fx = null;
    d.fy = null;
  }
});
