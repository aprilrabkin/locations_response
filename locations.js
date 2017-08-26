var http = require('http'),
    fs = require('fs'),
    path = require('path');

var _ = require('lodash');

http.createServer(function(req, res) {
    var data = JSON.parse(fs.readFileSync('locationsResponse.json'));
    var html = buildHtml(data);
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': data.length
    });
    res.end(html);
}).listen(8080);

function buildAreaA(json) {
    area_a = '<div><h1>Area A</h1>'
    boroughs = json["data"];
    boroughs = boroughs.sort(function(a, b) {
        var b1 = a["borough"]["weight"];
        var b2 = b["borough"]["weight"];
        return b1 - b2;
    });

    list_of_boroughs = "<ul>"

    //build ul of macros for each borough
    _.forEach(boroughs, function(borough) {
        var borough_name = borough["borough"]["name"]
        sorted_macros = borough["mappings"].sort(function(a, b) {
            var b1 = a["macro"]["weight"];
            var b2 = b["macro"]["weight"];
            return b1 - b2;
        });
        list_of_macros = "<li><h1>" + borough_name + "</h1></li>" + "<ul class=" + borough_name + ">"

        //build list of each macro's neighborhooods
        _.forEach(sorted_macros, function(macro) {
            macro_name = macro["macro"]["name"]

            if (macro_name == borough_name) {
                list_of_neighborhoods = "<ul>"
            } else {
                list_of_neighborhoods = "<li><h2>" + macro_name + "</h2></li>" + "<ul>"
            }
            _.forEach(macro["neighborhoods"], function(neighborhood) {
                list_of_neighborhoods += "<li class='neighborhood'>" + neighborhood["name"] + "</li>"
                return
            });
            list_of_neighborhoods += "</ul>"
            list_of_macros += list_of_neighborhoods
        });

        list_of_macros += "</ul>"
        list_of_boroughs += list_of_macros
    });
    list_of_boroughs += "</ul>"
    area_a += list_of_boroughs
    area_a += "</div>"
    return area_a

}

function buildAreaB(json) {
    area_b = '<div><h1>Area B</h1>'
    boroughs = json["data"];
    boroughs = boroughs.sort(function(a, b) {
        var b1 = a["borough"]["weight"];
        var b2 = b["borough"]["weight"];
        return b1 - b2;
    });

    list_of_boroughs = "<ul>"

    //build ul of macros for each borough
    _.forEach(boroughs, function(borough) {
        var borough_name = borough["borough"]["name"]
        list_of_boroughs += '<li id=' + borough_name + '>' + borough_name + '</li>'
    });
    list_of_boroughs += '</ul>'
    area_b += list_of_boroughs
    area_b += "</div>"
    return area_b
}

var css = "<style>.highlight {background-color: #FFFF00;} </style>"

var js = "<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script><script>$('.neighborhood').click(function(e) {borough = $(this).parent().parent().prop('className');$('#'+borough).toggleClass('highlight');}); </script>"

function buildHtml(data) {

    var head = css;
    var body = buildAreaB(data) + buildAreaA(data);
    var tail = js;

    return '<!DOCTYPE html>' +
        '<html><head>' + head + '</head><body>' + body + '</body>'+ tail + '</html>';
};