var http = require('http');
var fs = require('fs');

var message = 'Hiiii There!!';
var nodeMessage = "This is node!";
var girlsMessage = "This is girls!";
var querystring = require('querystring');


function handler (request, response){
  var url = request.url;
  console.log(url);
  var fileName = request.url.split('/').pop();
  var fileExt = request.url.split('.').pop();
  console.log(fileExt);

  if (url === "/") {
    response.writeHead(200, {"Content-Type": "text/html"});

    fs.readFile(__dirname + '/public/index.html', function(error, file) {
      if (error) {
        console.log(error);
        return;
      }
      response.end(file);
    });
  }

  else if (url === "/create-post") {

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

  }
    else {

      fs.readFile(__dirname + url, function(error, file) {
        if (error) {
          console.log(error);
          return;
        } else {
          response.writeHead(200, {'Content-Type': 'text/'+fileExt});
          response.end(file);
        }
      });
    }



  // } else if (url === "/node") {
  //     console.log(nodeMessage);
  // } else if (url === "/girls") {
  //     console.log(girlsMessage);
  // } else {
  //     console.log(message);
  // }
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");

});
