function init() {
    // Set width and height of the SVG element
    var w = 300;
    var h = 300;
    var padding = 20;

    // Dataset containing values for apples, oranges, and grapes
    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
    ];

    // Set color scheme for each category (apples, oranges, grapes)
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Define a stack generator for the dataset with keys corresponding to categories
    var stack = d3.stack()
                .keys(["apples", "oranges", "grapes"]);

    // Create stacked data series based on the dataset
    var series = stack(dataset);

    // Define the x-scale as a band scale, mapping each data point to a separate bar
    var xScale = d3.scaleBand()
        .domain(d3.range(dataset.length)) // Sets domain as index of dataset elements
        .rangeRound([padding, w - padding]) // Spans from padding to width minus padding
        .padding(0.05); // Adds space between bars

    // Define the y-scale as a linear scale to map total fruit values to heights in the SVG
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) { 
                return d.apples + d.oranges + d.grapes; // Sum of fruits in each data point
            })
        ])
        .range([h - padding, padding]); // Inverse range so lower values are at the bottom

    // Define the x-axis with tick marks based on xScale
    var xAxis = d3.axisBottom()
        .ticks(5) // Set number of ticks to 5
        .scale(xScale);

    // Define the y-axis with tick marks based on yScale
    var yAxis = d3.axisLeft()
        .ticks(5) // Set number of ticks to 5
        .scale(yScale);

    var svg = d3.select("#stack_bar")
                .append("svg")
                .attr("width", w + 100) // Increase width to accommodate legend
                .attr("height", h); 

    // Create group elements for each series (apples, oranges, grapes)
    var groups = svg.selectAll("g")
        .data(series) // Bind stacked series data
        .enter()
        .append("g")
        .style("fill", function(d, i) {
            return color(i); // Assign color to each category based on index
        });

    var rects = groups.selectAll("rect")
        .data(function(d) { return d; }) // Bind data within each series
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i); // Set x-position based on the index
        })
        .attr("y", function(d, i) {
            return yScale(d[1]); // Set y-position based on the top value in the stack
        })
        .attr("height", function(d) {
            return yScale(d[0]) - yScale(d[1]); // Calculate height from top to bottom of stack
        })
        .attr("width", xScale.bandwidth()); // Set the width of each bar

    // Append x-axis to the SVG, translate it to the bottom of the chart
    svg.append("g")
        .attr("transform", "translate(0, " + (h - padding) + ")")
        .call(xAxis);

    // Append y-axis to the SVG, position it on the left side
    svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);

    // Add legend to the chart
    var categories = ["apples", "oranges", "grapes"];

    var legend = svg.selectAll(".legend")
        .data(categories)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(" + (w + 20) + "," + (i * 20 + padding) + ")";
        });

    // Add colored rectangles to legend
    legend.append("rect")
        .attr("x", 0)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
            return color(i);
        });

    // Add text labels to legend
    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {
            return d;
        });
}

window.onload = init;
