var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  console.log('logging');
  if(req.method === 'GET'){
    //&& path.parse(req.url) === "/"
    res.writeHead('200', httpHelpers.headers);
    fs.createReadStream(path.join(__dirname, 'public/index.html')).pipe(res);
    console.log(res.domain + 'GETTIN');


    res.end(archive.paths.list);
  }
};
