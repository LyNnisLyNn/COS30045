function init() {
    // Declare variables
    var w = 1000;
    var h = 300;
    var barPadding = 10;
  
    // Declare datasets
    var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];
  
    var xScale = d3.scaleBand()
      .domain(d3.range(dataset.length))
      .rangeRound([0, w ])
      .paddingInner(0.05);
  
    var yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([h, 0]); // Change the range to [h, 0]
  
    //Background adjustments
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w) // Use the entire width
      .attr("height", h);
  
    // Bar chart adjustments 
    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) 
      {
        return xScale(i);
      })
      .attr("y", function (d) 
      {
        return yScale(d);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function (d) 
      {
        return h - yScale(d); // Adjust the height calculation
      })
      .attr("fill", "navy");
  
    d3.select("#add")
      .on("click", function () {
        var maxValue = 30;

          var newNumber = Math.floor(Math.random() * maxValue);
          dataset.push(newNumber);

        xScale.domain(d3.range(dataset.length));

        var bars = svg.selectAll("rect")
                        .data(dataset);

        bars.enter()
        .append("rect")
        .merge(bars)
        .transition()
        .duration(500)
        .attr("x", w)
        .attr("x", function(d, i)
        {
            return xScale(i)
        })
        .attr("width", xScale.bandwidth()) // Update the SVG width based on the new data
          .attr("y", function (d) 
          {
            return h - yScale(d);
          })
          .attr("height", function (d) 
          {
            return yScale(d);
          })
          .attr("fill", "navy");
  
      });

      d3.select("#delete")
      .on("click", function () {
  
        dataset.shift();

        var bars = svg.selectAll("rect")
        .data(dataset)
  
        bars.exit()
        .transition()
        .duration(500)
        .attr("x", w)
        .remove();
        
      });

  }
  
  window.onload = init;
  