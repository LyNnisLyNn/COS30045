function init() {
    var width = 1000;
    var height = 600;
    var padding = 25;

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
            LGA: d.LGA.trim(),  // Trim to avoid matching issues
            unemployed: +d.unemployed
        };
    }).then(function (data) {

        // Get the min and max unemployment values to define the quantize scale's domain
        var minValue = d3.min(data, d => d.unemployed);
        var maxValue = d3.max(data, d => d.unemployed);

        // Define a color scale using d3.scaleQuantize() with purples
        var color = d3.scaleQuantize()
            .domain([minValue, maxValue])  // Domain from the min to max unemployment values
            .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);  // Purple color range

        // Load the data from the LGA_VIC.json
        d3.json("LGA_VIC.json").then(function (json) {

            // Map unemployment data to corresponding LGAs in the GeoJSON file
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA;
                var dataValue = data[i].unemployed;

                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.LGA_name.trim();  // Trim for matching

                    if (dataState === jsonState) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }

            // Use the color scale to fill the map based on unemployment data
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("stroke", "dimgray")
                .attr("fill", function (d) {
                    var value = d.properties.value;
                    return value !== undefined ? color(value) : "#dcdcdc";  // Gray for missing values
                })
                .attr("d", path);

            // Load the city data and show circles
            d3.csv("VIC_city.csv", function (d) {
                return {
                    place: d.place,
                    lat: +d.lat,
                    long: +d.lon
                };
            }).then(function (cityData) {
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
                    .style("fill", "red")
                    .style("opacity", 0.75);
            });
        });
    });
}

window.onload = init;
