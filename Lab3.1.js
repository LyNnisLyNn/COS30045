function init()
{
  // Declaring variables
  var w = 1000;
  var h = 300; // Make the dots fits in the chart by increasing the height
  var padding = 80;

  // Datasets
  var dataset = [
      [5, 5],
      [500, 90],
      [250, 50],
      [100, 33],
      [330, 95],
      [410, 12],
      [475, 44],
      [25, 67],
      [85, 21],
      [220, 88], 
      [900, 200] //Outliers
  ];

  //Background adjustments
  var svg = d3.select("#plot")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "cyan");

    //Scale function adjustments for x-axis
      var xScale = d3.scaleLinear()
      .domain([d3.min(dataset, function(d) //Calculate the min value
      {
        return d[0];
      }),
      d3.max(dataset, function(d) //Calculate the max value
      {
        return d[0];
      })])
      .range([padding, w - padding]); //The left and right gap between the bars

     //Scale function adjustments for y-axis
    var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) //Calculate the min value
    {
        return d[1];
    }),
    d3.max(dataset, function(d) //Calculate the max value
    {
        return d[1];
    })])
    .range([h - padding, padding]); //The up and down gap between the bars

    //Use max() function to return the max of X coordinate in the dataset and then store it in the max_x variable.
    var max_x = d3.max(dataset, (d) => 
    {
        return d[0];
    })

    var min_x = d3.min(dataset, (d) => 
    {
        return d[0];
    })

  //Circle adjustments
  svg.selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      //The circles positions on the X and Y axis
      .attr("cx", function (d, i) 
      {
          return xScale(d[0]);
      })
      .attr("cy", function (d, i) 
      {
          return yScale(d[1]);
      })
      .attr("r", 5)
      .style("fill", "pink"); //The radius/size of the circle

  //Text adjustments
  svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("x", function (d, i) 
      {
          return xScale(d[0]) + 7; //The values left and right position
      })
      .attr("y", function (d) 
      {
          return yScale(d[1]) + 4; //The values up and down position
      })
      .text(function (d) 
      {
          return d[0] + ", " + d[1]; //The coma between X and Y values
      });
}
window.onload = init;