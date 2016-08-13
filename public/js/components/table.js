if(!d3.chart) d3.chart = {};

d3.chart.table = function() {

    var rootElement,
        data,
        width,
        dispatch = d3.dispatch(chart, "hover");

    var chart = function (element) {
        rootElement = element;
        element.append("div").classed("postsContainer", true);
        chart.update();
    }

    chart.update = function () {
        console.log('update data: ', data);
        var postsContainer = rootElement.select("div.postsContainer");
        var posts = postsContainer
                    .selectAll("div.post")
                    .data(data, function (d) { return d.data.id })
        console.log(posts);

        var postsEnter = posts.enter();

        postsEnter.append('p')
                  .text(function (d) { return d.data.score })


    }

    chart.data = function ( value ) {
        data = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
