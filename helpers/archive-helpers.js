var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.sitesArray = ['http://google.com'];

console.log('exports.sitesArray', exports.sitesArray);

exports.readListOfUrls = function(callback) {
  //use fs.readFile to check sites.txt, use callback(err, data) to execute callback array of urls in file as needed
  console.log('invoked readListOfUrls');
  fs.readFile(exports.paths.list, 'utf8', function(err, data){
    if (err) {
      return console.error(err);
    }
    console.log('readListOfUrls data: ', data);
    if(callback) {
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  //enact callback backed on true or false value()
  console.log('invoked isUrlInList');
  var found = false;
  if(exports.sitesArray.includes(url)) {
    found = true;
  }
  callback(found);
};

exports.addUrlToList = function(url, callback) {
  console.log('invoked addUrlToList');
  exports.sitesArray.push(url);
  fs.writeFileSync(exports.paths.list, 'utf8', exports.sitesArray.join('/n'));
  //callback? for later...
  //fs.write to sites.txt, execute call back if required
};

exports.isUrlArchived = function(url, callback) {
  //try to read file at exports.path.archivedSites + current url, return boolean and have conditional for error of success (initiate callback)
  console.log('invoked isUrlArchived');
  return fs.existsSync(path.join(exports.paths.archivedSites, url));
};

exports.downloadUrls = function(urls) {
  //use isUrlArchived to check, if not, GET request to site and collect with .on(data, callback) to store
  //fs.writeFile to in paths.archivedSites + url for future reference
  console.log('invoked downloadUrls');
  console.log('url array is type of: ', typeof (JSON.parse(urls)));
  urls.forEach(function(url) {
    if(!isUrlArchived(url)) {
      // GET request to url
      // Request url's index.html
      // Write the index.html to archives/sites directory
      // Once file is successfully written, call addUrlToList with url

      var options = {
        host: url,
        port: 80,
        path: '/index.html'
      };

      http.get(options, function(res) {
        console.log('downloadUrls ' + url + ' response: ' + res.statusCode);
        var body = '';
        res.on('data', function(chunk) {
          body += chunk;
        });
        response.on('end', function(){
          fs.writeFileSync(path.join(exports.paths.archivedSites, url), JSON.parse(body));
        });
      });
    }
  });
};
