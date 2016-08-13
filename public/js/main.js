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
    var postsElement = display.append("div").classed("posts", true);
    var posts = d3.chart.posts();
    posts.data(data);
    posts(postsElement);

    // SVG RENDERS -------------------------------------------------------------

    // SCATTER

    var svg = d3.select("svg")
    var scatterGroup = svg.append("g");
    var scatter = d3.chart.scatter()
                          .data(data)
                          (scatterGroup);





})
