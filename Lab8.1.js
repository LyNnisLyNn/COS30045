function init()
{
    var w = 600;
    var h = 400;

    var projection = d3.geoMercator()
                        .center([145, -36.5])
                        .translate([w / 2, h / 2])
                        .scale(3500);
    
    //Set up path
    var path = d3.geoPath()
                    .projection(projection);
    
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
                .attr("fill","steelblue")

    d3.json("LGA_VIC.json").then(function(json) 
    {
     //add path elements for each of the feature in the LGA   
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
    });
}

window.onload = init;