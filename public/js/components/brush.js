if(!d3.chart) d3.chart = {};

d3.chart.brush = function () {

    var rootElement,
        data,
        width = 800,
        height = 30,
        dispatch = d3.dispatch(chart, "filter");

    var chart = function ( container ) {
        rootElement = container;

        chart.update();
    }

    chart.update = function () {

        var extent = d3.extent( data, function(d) {
            return d.data.created
        })

        var xScale = d3.time.scale()
                            .domain(extent)
                            .range([0, width])

        var brush = d3.svg.brush()
        brush.x(xScale)
        brush(rootElement);
    }

    chart.data = function ( value ) {
        if (!arguments.length) return data;
        data = value;
        return chart;
    }

    chart.width = function ( value ) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
