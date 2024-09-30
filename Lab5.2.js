function init() {
    //Declare variables
    var w = 1000;
    var h = 300;
    var barPadding = 10;
  
    //Declare datasets
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
  
    var xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w ])
      .paddingInner(0.05);
  
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([h, 0]);
  
    //Background adjustment
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  
    // Bar Chart adjustments
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return xScale(i);
      })
      .attr("y", function (d) {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) {
        return h - yScale(d);
      })
      .attr("fill", "navy"); // Set bars to solid navy
  
    d3.select("#updates")
      .on("click", function () {
        var maxValue = 30;
        var numValues = dataset.length;
  
        dataset = [];
        for (var i = 0; i < numValues; i++) {
          var newNumber = Math.floor(Math.random() * maxValue);
          dataset.push(newNumber);
        }
  
        svg.attr("width", xScale.bandwidth() * dataset.length + 60); 
  
        svg.selectAll("rect")
          .data(dataset)
          .transition()
          .duration(500)
          .attr("y", function (d) {
            return yScale(d);
          })
          .attr("height", function (d) {
            return h - yScale(d);
          })
          .attr("fill", "navy"); // Solid navy bars
      });
  
    d3.select("#trans1")
      .on("click", function () {
        var maxValue = 30;
        var numValues = dataset.length;
  
        dataset = [];
        for (var i = 0; i < numValues; i++) {
          var newNumber = Math.floor(Math.random() * maxValue);
          dataset.push(newNumber);
        }
  
        svg.attr("width", xScale.bandwidth() * dataset.length + 60);
  
        svg.selectAll("rect")
          .data(dataset)
          .transition()
          .delay(500)
          .duration(2000)
          .attr("y", function (d) {
            return h - yScale(d);
          })
          .attr("height", function (d) {
            return yScale(d);
          })
          .attr("fill", "navy"); // Solid navy bars
      });
  
    d3.select("#trans2")
      .on("click", function () {
        var maxValue = 30;
        var numValues = dataset.length;
  
        dataset = [];
        for (var i = 0; i < numValues; i++) {
          var newNumber = Math.floor(Math.random() * maxValue);
          dataset.push(newNumber);
        }
  
        svg.attr("width", xScale.bandwidth() * dataset.length + 60);
  
        svg.selectAll("rect")
          .data(dataset)
          .transition()
          .delay(500)
          .ease(d3.easeCircleOut)
          .duration(2000)
          .attr("y", function (d) {
            return h - yScale(d);
          })
          .attr("height", function (d) {
            return yScale(d);
          })
          .attr("fill", "navy"); // Solid navy bars
      });
  
  }
  
  window.onload = init;
