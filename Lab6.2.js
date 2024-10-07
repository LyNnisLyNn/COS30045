function init() {
  //Declare variables
  var w = 1000;
  var h = 500;
  var height = 510;
  var topPaddingAdd = 30;
  var ascending = true;

  //Declare datasets
  var dataset = [24, 10, 29, 19, 8, 15, 20, 12, 9, 6, 21, 28];

  var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([0, w ])
    .paddingInner(0.05);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h, 0]);// Change the range to [h, 0]

    var yScale1 = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);// Change the range to [h, 0]

  //Background adjustments
  var svg = d3.select("#chart")
    .append("svg")
    .attr("width", w ) // Use the entire width
    .attr("height", height);

//Mouseover and Mouseout functions for the bars
function attachMouseEvents(bars) {
bars
  .on("mouseover", function (event, d) {
    d3.select(this)
      .attr("fill", "orange");

    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) + 24;

    svg.append("text")
      .attr("id", "tooltip")
      .attr("x", xPosition)
      .attr("y", yPosition)
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .attr("font-size", "25px")
      .text(d);
  })
  .on("mouseout", function (d) {
    d3.select(this)
      .transition()
      .attr("fill", "slategrey");

    d3.select("#tooltip").remove();
  });
}

  //Bar chart adjustments 
  var bars = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) 
    {
      return xScale(i);
    })
    .attr("y", function (d) 
    {
      return yScale(d) + topPaddingAdd;
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) 
    {
      return h - yScale(d); // Adjust the height calculation
    })
    .attr("fill", "slategrey") 

    attachMouseEvents(bars);

    // Add function
    d3.select("#add")
    .on("click", function () {
      var maxValue = 25;
      var newNumber = Math.floor(Math.random() * maxValue);
      dataset.push(newNumber);

      xScale.domain(d3.range(dataset.length));

      // Update the bars with the new data
      var updatedBars = svg.selectAll("rect")
        .data(dataset);

      updatedBars.enter()
        .append("rect")
        .merge(updatedBars)
        .transition()
        .duration(300)
        .attr("x", function (d, i) {
          return xScale(i);
        })
        .attr("y", function (d) { 
          return h - yScale1(d) + 20;
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d) {
          return yScale1(d) + topPaddingAdd;
        })
        .attr("fill", "slategrey");

      // Attach mouse events to the updated bars
      attachMouseEvents(updatedBars);
    });

    //delete function
    d3.select("#delete")
    .on("click", function () {

      dataset.shift();

      var updatedBars = svg.selectAll("rect")
      .data(dataset)

      updatedBars.exit()
      .transition()
      .duration(500)
      .attr("x", w)
      .remove();
      
    });

    //sort function
    var sortBars = function () {
      svg.selectAll("rect")
      .sort(function (a,b) {
        if (ascending) {
          return d3.ascending(a, b);
        } else {
          return d3.descending(a, b);
        }
      })
      .transition("sortBars")
      .duration(200)
      .attr("x", function (d, i) {
        return xScale(i);
      });

      //toggle to sort order
      ascending = !ascending;
    };

    //sort button
    d3.select("#sort")
    .on("click", function () {
      sortBars();
    });

    console.log(dataset);
}

window.onload = init;