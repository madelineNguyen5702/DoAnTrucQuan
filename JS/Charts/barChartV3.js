import handleData from "../functions/handleData.js";
import renderChart, { renderBarData } from "../functions/renderCharts.js";

const idSVG = "High_Sales";
renderChart("Top 10 mặt hàng có doanh thu cao nhất", idSVG);

// // set the dimensions and margins of the graph
let margin = { top: 10, right: 20, bottom: 80, left: 50 },
  width = 1200 - margin.left - margin.right,
  height = 3000 - margin.top - margin.bottom,
  barColor = "#58a4db";

// append the svg object to the body of the page
let svg = d3
  .select(`#${idSVG}`)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("../../data/task3.csv", function (rawData) {
  let { descData, max } = handleData(rawData);
  renderBarData(descData, svg, { width, height, max, barColor });
});
