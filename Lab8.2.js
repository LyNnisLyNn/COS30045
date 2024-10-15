function init() {
    var width = 1000;
    var height = 600;
    var padding = 25;

    var color = d3.scaleOrdinal()
        .range(["#00FF7F", "#FFA07A", "#9400D3", "#DC143C", "#1E90FF", "#FFD700", "#20B2AA", "#FF69B4", "#808080", "#DDA0DD", "#7FFFD4", "#4682B4"]);

    var projection = d3.geoMercator()
        .center([145, -36])
        .translate([width / 2, height / 2])
        .scale(5000);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + padding)
        .attr("height", height + padding);

    // Load the data from the VIC_LGA_unemployment.csv
    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return {
            LGA: +d.LGA,
            unemployed: +d.unemployed
        };
    }).then(function (data) {
        // Load the data from the LGA_VIC.json
        d3.json("LGA_VIC.json").then(function (json) {

            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA;
                var dataValue = parseFloat(data[i].unemployed);

                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.LGA_name;

                    if (dataState == jsonState) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }

            // Use colours to draw map paths
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("stroke", "dimgray")
                .attr("fill", function (d, i) {
                    return color(i);
                })
                .attr("d", path);

            // Load the data from the VIC_city.csv
            d3.csv("VIC_city.csv", function (d) {
                return {
                    place: d.place,
                    lat: +d.lat,
                    long: +d.lon
                };
            }).then(function (cityData) {
                // Show circles for the cities
                svg.selectAll("circle")
                    .data(cityData)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                        return projection([d.long, d.lat])[0];
                    })
                    .attr("cy", function (d) {
                        return projection([d.long, d.lat])[1];
                    })
                    .attr("r", 5)
                    .style("fill", d3.color("red"))
                    .style("opacity", 0.75);
            });
        });
    });
}

window.onload = init;
