if(!d3.chart) d3.chart = {};

d3.chart.posts = function() {

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

        // RENDER POSTS -------

        posts.exit().remove();

        var postsContainer = posts.enter();

        var postContainer = postsContainer
            .append('div')
            .classed('post', true);

        postContainer
            .append('div')
            .classed('postTitle', true)
            .append('a')
                .attr({ href: function(d) {  return d.data.url}})
                .text(function (d) { return d.data.title })

        var statsContainer = postContainer
            .append('div')
                .classed('stats', true);

        statsContainer
            .append('div')
                .classed('score', true)
                .text(function (d) { return d.data.score });

        statsContainer
            .append('div')
                .classed('comments', true)
                .text(function (d) { return d.data.num_comments })

        statsContainer
            .append('div')
                .classed('source', true)
                .text(function (d) { return d.data.domain })

        // EVENTS

        posts.on('mouseover', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node


            d3.select(node)
              .transition()
              .style('background-color', 'orange');
            dispatch.hover([d]);
        })

        posts.on('mouseout', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .transition()
              .style('background-color', 'white');
            dispatch.hover([]);
        })

    }

    chart.data = function ( value ) {
        data = value;
        return chart;
    }

    chart.highlight = function ( highlighted ) {

        var posts = rootElement.selectAll('.post')

        posts.transition()
             .style("background-color", "white");

        posts.data(highlighted, function(d) { return d.data.id })
             .transition()
             .style("background-color", "orange");
    }

    return d3.rebind(chart, dispatch, "on");
}
