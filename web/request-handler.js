var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
var htmlfetcher = require('../workers/htmlfetcher.js');
var url = require('url');

// require more modules/folders here!

var actions = {
  'GET': function(req, res) {
    var urlPath = url.parse(req.url).pathname;

    if(urlPath === '/') {
      urlPath = '/index.html';
    }

    httpHelpers.serveAssets(res, urlPath, function() {
      if(urlPath[0] === '/') {
        urlPath = urlPath.slice(1);
      }
      archive.isUrlInList(urlPath, function(found) {
        if(found) {
          httpHelpers.sendRedirect(res, '/loading.html');
        } else {
          httpHelpers.send404(res);
        }
      });
    });
  },
  'POST': function(request, response) {
    httpHelpers.collectData(request, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      // check sites.txt for web site
      archive.isUrlInList(url, function(found) {
        if (found) { // found site
          // check if site is on disk
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              // redirect to site page (/www.google.com)
              httpHelpers.sendRedirect(response, '/' + url);
            } else {
              // Redirect to loading.html
              httpHelpers.sendRedirect(response, '/loading.html');
            }
          });
        } else { // not found
          // add to sites.txt
          archive.addUrlToList(url, function() {
            // Redirect to loading.html
            httpHelpers.sendRedirect(response, '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  if(actions[req.method]){
    actions[req.method](req, res);
  } else {
    httpHelpers.send404(response);
  }
    //&& path.parse(req.url) === "/"

    // if input URL is in sites.txt object, return sitesObj[urlKey]
    // if input URL is not in sites.text object, give them a 404

    // htmlfetcher.htmlfetcher();
    // res.writeHead('200', httpHelpers.headers);
    // var urlList = archive.readListOfUrls();
    // console.log('urlList: ', urlList);
    // console.log('archive.sitesArray: ', archive.sitesArray);
    // var data = fs.readFileSync(archive.paths.index, 'utf8');
    // res.end(data);
    // res.end(archive.paths.list);
};


// fs.createReadStream(path.join(__dirname, 'public/index.html'));
