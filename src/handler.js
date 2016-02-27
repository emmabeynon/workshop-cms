var fs = require('fs');
var querystring = require('querystring');

function handler(request, response) {
  var url = request.url;
  var fileExt = request.url.split('.').pop();
  if(url === '/') {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile(__dirname + '/../public/index.html', function(error, file) {
      if(error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  } else if (url === '/create/post') {
    var allTheData = '';
    request.on('data', function(chunkOfData) {
      allTheData += chunkOfData;
    });
    request.on('end', function() {
      var convertedData = querystring.parse(allTheData);
      console.log(convertedData);
      response.writeHead(302, {"Location": "/"});
      response.end();
    });
  } else {
    response.writeHead(200, {"Content-Type": "text/" + fileExt});
    fs.readFile(__dirname + '/../public' + url, function(error, file) {
      if(error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }

}

module.exports = handler;
