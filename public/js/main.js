console.log('main.js is now loaded')

d3.json("../posts.json", function(err, posts) {

    var data = posts.data.children;

    data.forEach(function(d) {
        d.data.created *= 1000;
    })

    // console.log(data);

    var display = d3.select("#display")
    var tdiv = display.append("div").classed("table", true)
    var table = d3.chart.table();
    table.data(data); 
    table(tdiv);


})
