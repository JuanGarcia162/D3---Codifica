document.getElementById("update-data").addEventListener("click", () => {
  const input = document.getElementById("source-data").value;
  const data = parseInputData(input);

  if (data.length === 0) {
    alert("Please enter at least one valid number.");
    return;
  }

  drawChart(data);
});

// Function to process input data
function parseInputData(input) {
  return input
    .split(",")
    .map((num) => parseFloat(num.trim()))
    .filter((num) => !isNaN(num));
}

// Function to draw the chart
function drawChart(data) {
  const svg = d3.select("#chart");
  svg.selectAll("*").remove();

  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const barHeight = height / data.length;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

  const colors = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(d3.range(data.length));

  // Draw the bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("height", barHeight - 1)
    .attr("width", (d) => xScale(d))
    .attr("x", 0)
    .attr("y", (d, i) => i * barHeight)
    .attr("fill", (d, i) => colors(i));

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (d) => xScale(d) - 10)
    .attr("y", (d, i) => i * barHeight + barHeight / 2 + 4)
    .attr("fill", (d) => (xScale(d) < 30 ? "#000" : "#fff"))
    .attr("text-anchor", "end")
    .text((d) => d);
}
