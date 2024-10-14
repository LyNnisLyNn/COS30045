function init()
{
    //Graph's dimensions and margin adjustments
    var w = 450;
    var h = 450;

    var dataset = [5, 6, 10, 20, 25, 45];

    //Radius adjustments
    var outerRadius = w / 2;
    var innerRadius = 0;

    //Chart size customization based on outer and inner radius 
    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    //Pie chart creation 
    var pie = d3.pie();

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#pie_chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                //Move the pie chart to the middle
                .attr("transform", "translate(" + w / 1.2 + "," + h / 15 + ")"); 

    var arcs = svg.selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

    arcs.append("path")
    .attr("fill", function(d, i)
    {
        return color(i);
    })
    .attr("d", function(d, i)
    {
        return arc(d, i);
    });

    arcs.append("text")
    .text(function(d)
    {
        return d.value;
    })
    .attr("transform", function(d)
    {
        return "translate(" + arc.centroid(d) + ")"
    });

}

window.onload = init;