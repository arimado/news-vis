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

        // postContainer.asd

    }

    chart.data = function ( value ) {
        data = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
