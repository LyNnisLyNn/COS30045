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

    // Load the unemployment data
    d3.csv("VIC_LGA_unemployment.csv", function (d) {
        return {
            LGA: d.LGA.trim(),  // Trim to avoid matching issues
            unemployed: +d.unemployed
        };
    }).then(function (data) {

        // Log the data to verify it's loading correctly
        console.log("Unemployment data:", data);

        // Get the min and max unemployment values for the color scale
        var minValue = d3.min(data, d => d.unemployed);
        var maxValue = d3.max(data, d => d.unemployed);

        // Update the color scale domain based on actual data
        var color = d3.scaleSequential(d3.interpolateBlues)
            .domain([minValue, maxValue]);

        // Load the geographic data
        d3.json("LGA_VIC.json").then(function (json) {

            // Map unemployment data to LGAs
            for (var i = 0; i < data.length; i++) {
                var dataState = data[i].LGA;
                var dataValue = data[i].unemployed;

                // Match unemployment data to GeoJSON features
                for (var j = 0; j < json.features.length; j++) {
                    var jsonState = json.features[j].properties.LGA_name.trim();  // Trim for matching

                    if (dataState === jsonState) {
                        json.features[j].properties.value = dataValue;
                        break;
                    }
                }
            }

            // Log to check if data is matched correctly
            console.log("GeoJSON with unemployment values:", json);

            // Draw the map
            svg.selectAll("path")
                .data(json.features)
                .enter()
                .append("path")
                .attr("stroke", "dimgray")
                .attr("fill", function (d) {
                    // Get the unemployment value and apply the color scale
                    var value = d.properties.value;
                    return value !== undefined ? color(value) : "#dcdcdc";  // Gray for missing values
                })
                .attr("d", path);

            // Load city data and show circles
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
