if(!d3.chart) d3.chart = {};

d3.chart.posts = function() {

    var rootElement,
        data,
        width,
        dispatch = d3.dispatch(chart, "hover", "sourceHover");

    var colorScale = d3.scale.category20c();


    var chart = function (element) {
        rootElement = element;

        rootElement.append("div")
                   .classed("postsContainer", true);

        rootElement.append("div")
                   .classed("sourcesContainer", true);

        chart.update();

    }

    chart.update = function () {

        // get all unique values in an array


        // console.log('update data: ', data);
        var postsContainer = rootElement.select("div.postsContainer");
        var posts = postsContainer
                    .selectAll("div.post")
                    .data(data, function (d) { return d.data.id })
        // console.log(posts);

        // RENDER POSTS ----------------------------

        posts.exit().remove();

        var postsContainer = posts.enter();

        var postContainer = postsContainer
            .append('div')
            .classed('post', true)
            .attr({ id: function(d) {  return d.data.id}})

        postContainer
            .append('div')
            .classed('title', true)
            .append('a')
                .attr({ href: function(d) {  return d.data.url}})
                .text(function (d) { return d.data.title })

        var statsContainer = postContainer
            .append('div')
                .classed('stats', true);

        var scoreContainer = statsContainer
            .append('div')
                .classed('score', true)
                .classed('tag', true)

        scoreContainer
            .append('i')
            .classed('fa', true)
            .classed('fa-thumbs-up', true);

        scoreContainer
            .append('span')
            .text(function (d) { return d.data.score });

        var commentsContainer = statsContainer
            .append('div')
                .classed('comments', true)
                .classed('tag', true)

        commentsContainer
            .append('i')
            .classed('fa', true)
            .classed('fa-commenting', true);

        commentsContainer
            .append('span')
            .text(function (d) { return d.data.num_comments })

        var sourceContainer = postContainer
            .append('div')
                .classed('source', true)
                .classed('tag', true)
                .style('background', function (d) {
                    return colorScale(d.data.domain)
                })

        sourceContainer
            .append('span')
            .text(function (d) { return d.data.domain })


        // RENDER SOURCES ------------------------------------

        var uniqueScores =  _.chain(data).uniqBy(function(d) {
            return d.data.domain;
        })

        var sourceCounts = uniqueScores.value().map(function(d) {
            console.log(d.data.domain)
            return {
                domain: d.data.domain,
                count: _.countBy(data, function(dC) {
                    return dC.data.domain === d.data.domain
                }).true
            }
        })

        var sources = rootElement
                .select("div.postsContainer")
                .selectAll("div.postSource")
                .data(data, function (d) { return d.data.domain })

        var sourcesContainer = sources.enter();

        var sourceContainer = sourcesContainer
                .append('div')
                .classed('postSource', true)
                .attr({ id: function(d) {  return 'source_' + d.data.id }});

        var sourceContent = sourceContainer
                .append('div')
                .classed('title', true)

        sourceContent
                .append('i')
                .classed('fa', true)
                .classed('fa-circle', true)
                .style('color', function (d) { return colorScale(d.data.domain) } )

        sourceContent
                .append('a')
                .attr({ href: '#'})
                .text(function (d) { return d.data.domain })

        var sourceFreqContainer = sourceContent
                .append('p')

        

                // .text(function (d, i) {
                //
                //     console.log(d.data.domain);
                //
                //     data.forEach(function (dataCheck) {
                //         if (d.data.domain === dataCheck.data.domain) {
                //
                //             // console.log('append --------------')
                //
                //             // console.log(d.data.domain)
                //             // console.log(dataCheck.data.domain)
                //
                //
                //
                //             // $('#source_' + d.data.id + ' .lols')[0].appendChild(document.createElement('p'))
                //             //
                //             // console.log($('#source_' + d.data.id + ' .lols')[0]);
                //
                //
                //
                //             sourceFreq.append('i')
                //                       .classed('fa', true)
                //                       .classed('fa-circle', true)
                //                       .style('color', 'black' )
                //                       .text(dataCheck.data.domain);
                //         }
                //
                //     })
                //
                //     return '';
                // })






        // EVENTS --------------------------------------------------------------

        posts.on('mouseover', function(d) {
            // console.log('mouseover')
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .style('background-color', '#ccc');
            dispatch.hover([d]);
        })

        posts.on('mouseout', function(d) {
            // console.log('mouseout')
            var node = this; // 'this' -> a reference to the DOM Node
            d3.select(node)
              .style('background-color', 'white');
            dispatch.hover([]);
        })

        sources.on('mouseover', function (d) {
            var node = this;
            var matchedSources = _.filter(data, function(i) { return i.data.domain === d.data.domain });
            dispatch.sourceHover(matchedSources);
        })

        sources.on('mouseout', function (d) {
            var node = this;
            dispatch.sourceHover([]);
        })

    }

    chart.data = function ( value ) {
        data = value;
        return chart;
    }

    chart.highlight = function ( highlighted ) {

        var posts = rootElement.selectAll('.post')

        posts.style("background-color", "white");

        posts.data(highlighted, function(d) { return d.data.id })
            .transition()
            .style("background-color", "orange");

    }

    return d3.rebind(chart, dispatch, "on");
}
