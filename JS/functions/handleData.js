export default function handleData(data) {
  console.log("data: ", data);
  let rawData = data.map(({ StockCode, AvgUnitPrice }) => {
    return { StockCode, AvgUnitPrice: AvgUnitPrice * 1 };
  });
  let ascData = _.orderBy(rawData, ["AvgUnitPrice"], ["asc"]);
  let descData = _.orderBy(rawData, ["AvgUnitPrice"], ["desc"]);
  let max = _.maxBy(rawData, ({ AvgUnitPrice }) => {
    return AvgUnitPrice * 1;
  }).AvgUnitPrice;
  let min = _.minBy(rawData, ({ AvgUnitPrice }) => {
    return AvgUnitPrice * 1;
  }).AvgUnitPrice;
  return { ascData, descData, max, min };
}
