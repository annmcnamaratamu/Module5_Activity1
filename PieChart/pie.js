//both female and male data
var totals = [{
    title: "Soft-serve",
    value: 286,
    all: 1098
    },
    {
    title: "Scooped",
    value: 472,
    all: 1098
    },
    {
    title: "No Preference",
    value: 318,
    all: 1098
    },
    {
    title: "Not Sure",
    value: 22,
    all: 1098
    }
];
//female
var femaleData = [{
    title: "Soft-serve",
    value: 25,
    all: 100
    },
    {
    title: "Scooped",
    value: 44,
    all: 100
    },
    {
    title: "No Preference",
    value: 28,
    all: 100
    },
    {
    title: "Not Sure",
    value: 3,
    all: 100
    }
];
//male
var maleData = [{
    title: "Soft-serve",
    value: 27,
    all: 100
    },
    {
    title: "Scooped",
    value: 42,
    all: 100
    },
    {
    title: "No Preference",
    value: 30,
    all: 100
    },
    {
    title: "Not Sure",
    value: 2,
    all: 100
    }
];


var width  = 500;
var height = 500;
var radius = Math.min(width, height) / 2;
var donutWidth = 150; //This is the size of the hole in the middle
                      //set to radius for a pie chart

//Only choose one! This one for a d3 color scheme:
//var color = d3.scaleOrdinal(d3.schemeCategory20c);
//Or this one for a customized color scheme:
var color = d3.scaleOrdinal()
.range(["#5A39AC", "#DD98D6", "#E7C820", "#08B2B2"]);

var svg = d3.select('#donut')
     .append('svg')
     .attr('width', width)
     .attr('height', height)
     .append('g')
     .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

var arc = d3.arc()
     .innerRadius(radius - donutWidth)
     .outerRadius(radius);

var pie = d3.pie()
     .value(function (d) {
          return d.value;
     })
     .sort(null);

var path = svg.selectAll('path')
     .data(pie(totals))
     .enter()
     .append('path')
     .attr('d', arc)
     .attr('fill', function (d, i) {
          return color(d.data.title);
     })
     .attr('transform', 'translate(0, 0)')

//LEGENDS
//we have not covered this yet but its fairly straightforward. 
var legendRectSize = 13;
var legendSpacing = 7;
var legend = svg.selectAll('.legend') //the legend and placement
.data(color.domain())
.enter()
.append('g')
.attr('class', 'circle-legend')
.attr('transform', function (d, i) {
     var height = legendRectSize + legendSpacing;
     var offset = height * color.domain().length / 2;
     var horz = -2 * legendRectSize - 13;
     var vert = i * height - offset;
     return 'translate(' + horz + ',' + vert + ')';
});
legend.append('circle') //keys
.style('fill', color)
.style('stroke', color)
.attr('cx', 0)
.attr('cy', 0)
.attr('r', '.5rem');
legend.append('text') //labels
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.text(function (d) {
     return d;
});