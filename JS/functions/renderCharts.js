export default function renderContainer(chartName, id) {
  /* get body and add content HTML = Node*/
  const sectionEl = document.createElement("section");
  sectionEl.className = "container";
  sectionEl.innerHTML = `
        <h1>${chartName}</h1>
        <div id=${id}></div>
    `;
  document.querySelector("body").appendChild(sectionEl);
}

export function renderBarData(data, svg, { width, height, max, barColor }) {
  // X axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d) {
        return d.StockCode;
      })
    )
    .padding(0.1);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, max]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.StockCode);
    })
    .attr("width", x.bandwidth())
    .attr("fill", barColor)
    .attr("opacity", 0)
    // no bar at the beginning thus:
    .attr("height", function (d) {
      return d.AvgUnitPrice;
    }) // always equal to 0
    .attr("y", function (d) {
      return height;
    });

  // Animation
  svg
    .selectAll("rect")
    .transition()
    .duration(300)
    .attr("opacity", 1)
    .attr("y", function (d) {
      return y(d.AvgUnitPrice);
    })
    .attr("height", function (d) {
      return height - y(d.AvgUnitPrice);
    })
    .delay(function (d, i) {
      return i * 100;
    });
}
