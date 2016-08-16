if(!d3.chart) d3.chart = {};

d3.chart.scatter = function () {

    var rootElement,
        data,
        height = 400,
        width = 930,
        dispatch = d3.dispatch(chart, "hover"),
        cx = 10;

    var chart = function (element) {
        rootElement = element;

        rootElement.append("g")
                   .classed('xAxis', true);

        rootElement.append("g")
                   .classed('yAxis', true);

        chart.update();

    }

    chart.update = function () {

        // Initialise Scale  --------

        var maxCreated = d3.max(data, function(d) { return d.data.created });
        var minCreated = d3.min(data, function(d) { return d.data.created });
        var maxScore = d3.max(data, function(d) { return d.data.score });

        var createdScale = d3.time.scale()
                                  .domain([minCreated, maxCreated])
                                  .range([cx, width]);

        var commentScale = d3.scale.linear()
                                   .domain(d3.extent(data, function(d) {return d.data.num_comments}))
                                   .range([3, 20])

        var yScale = d3.scale.linear()
                             .domain([0, maxScore])
                             .range([height, cx])

        // RENDER ELEMENTS  --------

        var xAxis = d3.svg.axis()
                          .scale(createdScale)
                          .ticks(3)
                          .tickFormat(d3.time.format("%x %H:%M"))

        var xGroup = rootElement.select('.xAxis')
                                .classed('axis', true)
                                .attr("transform", "translate(" + [0,height] + ")")
                                .transition()

        var circles = rootElement.selectAll("circle")
                                 .data(data, function(d){ return d.data.id })

        circles.enter()
               .append('circle');

        circles
            .transition()
            .attr({
                cx: function(d, i) { return createdScale(d.data.created) },
                cy: function(d, i) { return yScale(d.data.score) },
                r: function(d, i) { return commentScale(d.data.num_comments) }
            })
            .style("fill", "white")
            .style("stroke", "black")
            .style("stroke-width", "2")
            // .style('opacity', function(d) {return commentScale(d.data.num_comments)})
        xAxis(xGroup);

        circles.exit().remove()

        // Event handlers for circles --------

        circles.on('mouseover', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .transition()
              .style("fill", "black")
              .style("stroke", "none")
              .style("stroke-width", "0");
            dispatch.hover([d]);
        })

        circles.on('mouseout', function(d) {
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .transition()
              .style("fill", "white")
              .style("stroke", "black")
              .style("stroke-width", "2")
            dispatch.hover([]);
        })
    }

    chart.data = function (value) {
        if(!arguments.length) return data;
        data = value;
        return chart;
    }

    chart.highlight = function ( highlighted ) {

        console.log(highlighted);

        var circles = rootElement.selectAll('circle')

        circles
            .interrupt()
            .transition()
            .style("fill", "white")
            .style("stroke", "black")
            .style("stroke-width", "2")


        var selected = circles
                       .data(highlighted, function(d) { return d.data.id })
                       .interrupt()
                       .transition()
                       .style("fill", "red")
                       .style("stroke", "none")
                       .style("stroke-width", "2");

        

        // rootElement.append('ellipse')
        //            .attr({
        //                cx: 50,
        //                cy: 50,
        //                rx: 20,
        //                ry: 20,
        //                r: 40,
        //            })
        //            .style('fill', 'blue');




        /// draw another circle at a particular point

        // highlightedCircle.enter()
        //                  .append('ellipse')
        //                  .attr({
        //                      cx: selected[0][0].getAttribute('cx') ,
        //                      cy: selected[0][0].getAttribute('cy') ,
        //                      rx: 10 ,
        //                      ry: 10 ,
        //                      r: 20
        //                  })
        //                  .style('fill', 'blue');



    }

    chart.width = function ( value ) {
        if ( arguments.length < 1 ) return width;
        width = value;
        return chart;
    }

    chart.height = function ( value ) {
        if ( arguments.length < 1 ) return height;
        height = value;
        return chart;
    }

    return d3.rebind(chart, dispatch, "on");
}
