function init() {
    //Variables declarations
    var w = 1000;
    var h = 500;
    var padding = 50; //Padding variable adjustment

    //Dataset variable declarations
    var dataset = [];
    var formatTime = d3.timeFormat("%Y");

    //Read the Unemployment_78-95.csv
    d3.csv("Lab7.1.csv", function (d) {
        return {
            date: new Date(+d.year, +d.month - 1),
            number: +d.number
        };
    }).then(function (data) {
        dataset = data;
        lineChart(dataset);
        console.table(dataset, ["date", "number"]);
    });

    function lineChart(dataset) {
        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function (d) { return d.date; }),
                d3.max(dataset, function (d) { return d.date; })
            ])
            .range([padding + 20, w - padding]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, function (d) { return d.number; })])
            .range([h - padding, padding]);

        var xAxis = d3.axisBottom()
            .scale(xScale)
            .tickFormat(formatTime)
            .ticks(10);

        var yAxis = d3.axisLeft()
            .scale(yScale)
            .ticks(10);

        var line = d3.line()
            .x(function (d) { return xScale(d.date); })
            .y(function (d) { return yScale(d.number); });

        var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
           
        var area = d3.area()
            .x(function (d) { return xScale(d.date); })
            .y0(function () { return yScale.range()[0]; })  
            .y1(function (d) { return yScale(d.number); });

        svg.append("path")
            .datum(dataset)
            .style("fill", "deepskyblue") 
            .attr("class", "line")
            .attr("d", area);

        svg.append("g")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(xAxis);

        svg.append("g")
            .attr("transform", "translate(" + (padding + 20) + ", 0)")
            .call(yAxis);

        svg.append("line")
            .style("stroke", "purple") 
            .style("stroke-width", 0.5)
            .style("stroke-dasharray", "4,4")
            .attr("class", "line halfMilMark")
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            .attr("x2", w - padding)
            .attr("y2", yScale(500000));

        svg.append("text")
            .attr("class", "halfMilLabel")
            .attr("x", padding + 30)
            .attr("y", yScale(500000) - 7)
            .attr("fill", "purple")
            .text("Half A Million Unemployed");

    }
}

window.onload = init;