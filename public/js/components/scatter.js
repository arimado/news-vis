if(!d3.chart) d3.chart = {};

d3.chart.scatter = function () {

    var rootElement,
        data = 500,
        width = 400,
        dispatch = d3.dispatch(chart, "hover"),
        cx = 10;

    var chart = function (element) {
        rootElement = element;
        element.append("div").classed("postsContainer", true);
        chart.update();

        rootElement = element;

        rootElement.append("g")
                   .classed('xaxis', true);

        rootElement.append("g")
                   .classed('yaxis', true);

    }

    chart.update = function () {

        var maxCreated = d3.max(data, function(d) { return d.data.created });
        var minCreated = d3.min(data, function(d) { return d.data.created });
        var maxScore = d3.max(data, function(d) { return d.data.score });

    }

    chart.data = function (value) {
        if(!arguments.length) return data;
        data = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on")

}
