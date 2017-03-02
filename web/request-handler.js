var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if(req.method === 'GET'){
    //&& path.parse(req.url) === "/"
    res.writeHead('200', httpHelpers.headers);
    var data = fs.readFileSync(path.join(__dirname, 'public/index.html'));
    res.end(data);
    // res.end(archive.paths.list);
  }
};


// fs.createReadStream(path.join(__dirname, 'public/index.html'));
