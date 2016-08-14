console.log('main.js is now loaded')

d3.json("../posts.json", function(err, posts) {

    var data = posts.data.children;

    data.forEach(function(d) {
        d.data.created *= 1000;
    })

    var display = d3.select("#display");

    // DOM RENDERS -------------------------------------------------------------

    // POSTS
    //
    var postsElement = display
                       .append("div")
                       .classed("", true)
                       .classed("posts", true);

    var posts = d3.chart.posts();
    posts.data(data);
    posts(postsElement);

    // SVG RENDERS -------------------------------------------------------------

    var svg = d3.select("svg")

    // SCATTER

    var scatterGroup = svg.append("g");
    var scatter = d3.chart.scatter();

    scatter
      .data(data)
      (scatterGroup);

    // BRUSH

    var brushGroup = svg.append("g")
                        .attr("transform", "translate(100, 430)");

    var brush = d3.chart.brush();

    brush
        .data(data)
        .width(800)
        (brushGroup);

    // D3 EVENTS ---------------------------------------------------------------

    brush.on("filter", function(filtered) {
        console.log('sup', filtered);
        scatter.data(filtered);
        scatter.update();
        posts.data(filtered);
        posts.update();
    });

    scatter.on("hover", function(hovered) {
        console.log('hovered: ', hovered);
    })

    // posts.highlight();


})
