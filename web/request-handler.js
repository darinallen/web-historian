var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var htmlfetcher = require('../workers/htmlfetcher.js');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    //&& path.parse(req.url) === "/"

    // if input URL is in sites.txt object, return sitesObj[urlKey]
    // if input URL is not in sites.text object, give them a 404

    htmlfetcher.htmlfetcher();
    res.writeHead('200', httpHelpers.headers);
    var urlList = archive.readListOfUrls();
    console.log('urlList: ', urlList);
    console.log('archive.sitesArray: ', archive.sitesArray);
    var data = fs.readFileSync(archive.paths.index, 'utf8');
    res.end(data);
    // res.end(archive.paths.list);
  }
};


// fs.createReadStream(path.join(__dirname, 'public/index.html'));
