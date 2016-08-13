if(!d3.chart) d3.chart = {};

d3.chart.scatter = function () {

    var rootElement,
        data,
        height = 400,
        width = 500,
        dispatch = d3.dispatch(chart, "hover"),
        cx = 10;

    var chart = function (element) {
        rootElement = element;

        rootElement = element;

        rootElement.append("g")
                   .classed('xAxis', true);

        rootElement.append("g")
                   .classed('yAxis', true);

        chart.update();

    }

    chart.update = function () {

        var maxCreated = d3.max(data, function(d) { return d.data.created });
        var minCreated = d3.min(data, function(d) { return d.data.created });
        var maxScore = d3.max(data, function(d) { return d.data.score });

        var createdScale = d3.time.scale()
                                  .domain([minCreated, maxCreated])
                                  .range([cx, width]);

        var xAxis = d3.svg.axis()
                          .scale(createdScale)
                          .ticks(3)
                          .tickFormat(d3.time.format("%x %H:%M"))

        var xGroup = rootElement.select('.xAxis')
                                .classed('axis', true)
                                .attr("transform", "translate(" + [0,height] + ")")
                                .transition()

        xAxis(xGroup);



    }

    chart.data = function (value) {
        if(!arguments.length) return data;
        data = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
