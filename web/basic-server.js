var http = require('http');
var handler = require('./request-handler.js');
var initialize = require('./initialize.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

var port = 8080;
var ip = '127.0.0.1';
var server = http.createServer(handler.handleRequest);

//module.parent refers to the first file to require the module
if (module.parent) {
  module.exports = server;
  console.log('Module.parent exists');
} else {
  server.listen(port, ip);
  console.log('Listening on http://' + ip + ':' + port);
}
