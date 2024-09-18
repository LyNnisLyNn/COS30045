function init() {
    // Declare variables
    var w = 800;
    var h = 500;
    var padding = 80;  // Padding for the axes
  
    // Declare dataset
    var dataset = [
        [2, 8],
        [3, 5],
        [5, 17],
        [6, 6],
        [6, 12],
        [7, 20],
        [8, 22],
        [10, 11],
        [5, 12],
        [6, 16]
    ];
  
    // Background adjustments
    var svg = d3.select("#plot")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "cyan");
  
    // Add padding for the axes to avoid dots being on the edges
    var xPadding = 1;  // Additional padding for x-axis domain
    var yPadding = 2;  // Additional padding for y-axis domain
  
    // Scale function for x-axis with extra padding
    var xScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, function(d) { return d[0]; }) - xPadding,  // Add padding to min x-value
        d3.max(dataset, function(d) { return d[0]; }) + xPadding   // Add padding to max x-value
      ])
      .range([padding, w - padding]);  // The left and right gap between the bars
  
    // Scale function for y-axis with extra padding
    var yScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, function(d) { return d[1]; }) - yPadding,  // Add padding to min y-value
        d3.max(dataset, function(d) { return d[1]; }) + yPadding   // Add padding to max y-value
      ])
      .range([h - padding, padding]);  // The up and down gap between the bars
  
    // Circle adjustments
    svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[0]);
      })
      .attr("cy", function(d) {
        return yScale(d[1]);
      })
      .attr("r", 5)  // The radius/size of the circle 
      .style("fill", "pink");
  
    // Text adjustments for the points
    svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("x", function(d) {
        return xScale(d[0]) + 7;
      })
      .attr("y", function(d) {
        return yScale(d[1]) + 4;
      })
      .text(function(d) {
        return d[0] + ", " + d[1];  // Display the X and Y values
      });
  
    // x-axis
    var xAxis = d3.axisBottom()
      .scale(xScale);

    // y-axis
    var yAxis = d3.axisLeft()
      .ticks(5)
      .scale(yScale);
  
    // Append the x-axis
    svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);
  
    // Append the y-axis
    svg.append("g")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);
  
    // Add x-axis label
    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "middle")
      .attr("x", w / 2)
      .attr("y", h - padding / 4)  // Adjust to position below the x-axis
      .text("Tree Age (Years)");
  
    // Add y-axis label
    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", padding / 4)
      .text("Tree Height (m)");
  }
  
  window.onload = init;
