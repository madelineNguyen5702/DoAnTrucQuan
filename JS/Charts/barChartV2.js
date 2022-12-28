import handleData from "../functions/handleData.js";
import renderChart, { renderBarData } from "../functions/renderCharts.js";

const idSVG = "High_Orders";
renderChart("Top 10 mặt hàng có đơn giá cao nhất", idSVG);

// // set the dimensions and margins of the graph
var margin = { top: 10, right: 20, bottom: 80, left: 50 },
  width = 1200 - margin.left - margin.right,
  height = 3000 - margin.top - margin.bottom,
  barColor = "#e09bc9";

// append the svg object to the body of the page
var svg = d3
  .select(`#${idSVG}`)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("../../data/task2.csv", function (rawData) {
  let { descData, max } = handleData(rawData);
  renderBarData(descData, svg, { width, height, max, barColor });
});

const idSvgNoMax = "High_Orders_NoMax";
renderChart("Top 10 mặt hàng có đơn giá cao nhất (no max)", idSvgNoMax);
var svgNoMax = d3
  .select(`#${idSvgNoMax}`)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("../../data/task2.csv", function (rawData) {
  let data = handleData(rawData).descData.splice(1);
  let { descData, max } = handleData(data);
  barColor = "#cada1b";
  console.log("descData: ", descData);
  renderBarData(descData, svgNoMax, { width, height, max, barColor });
});
