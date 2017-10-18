var express = require("express");
var app = express();
var request = require("request");
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;

app.get("/test", function(req, res) {
    var departure = req.query.departure;
    console.log("requested departure is: " + departure);
    var options = {
        url: 'http://dv.njtransit.com/mobile/tid-mobile.aspx?sid=NY',
        method: 'GET',
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate, sdch",
            "Accept-Language": "en-US,en;q=0.8,pt;q=0.6,nb;q=0.4",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "dv.njtransit.com",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36"
        }
    }
    request(options, function(error, response, body) {
        // console.log("error: " + error);
        // console.log("\n\nresponse: " + response);
        // console.log("\n\nresponse with JSON.stringify: " + JSON.stringify(response));
        // console.log("\n\nbody: " + body);
        // console.log("\n\nbody with JSON.stringify: " + JSON.stringify(body));
        // columns: DEP, TO, TRK, LINE, TRAIN, and STATUS
        var doc = new dom().parseFromString(body);
        var nodes = xpath.select("//tr[@onClick]", doc);
        console.log("found " + nodes.length + " tr elements with the onClick attribute");
        for (var i = 0; i < nodes.length; i++) {

            if (i == 5) {
                for (var cn in nodes[i].childNodes) {
                    console.log("childNode " + cn + ": ");
                    console.log(nodes[i].childNodes[cn]);
                }
                break;
            }
        }
        res.send("yes");
    });
});

app.listen(3000, function() {
    console.log("listening on port 3000");
});
