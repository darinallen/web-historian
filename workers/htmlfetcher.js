// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

exports.htmlfetcher = function() {
  archive.downloadUrls(archive.sitesArray);
};
// this function can be created using archive-helper functions, including readListsofUrls and downloadUrls - probably not much new code needed
