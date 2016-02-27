var http = require('http');
var fs = require('fs');

var message = 'Hiiii There!!';
var nodeMessage = "This is node!";
var girlsMessage = "This is girls!";

function handler (request, response){
  var url = request.url;
  console.log(url);
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
    else if (fileExt === 'css') {

      fs.readFile(__dirname + '/public/main.css', function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        response.writeHead(200, {'Content-Type': 'text/'+fileExt});
        response.end(file);
      });

    } else if (fileExt === 'jpg') {

      fs.readFile(__dirname + '/public/image.jpg', function(error, file) {
        if (error) {
          console.log(error);
          return;
        }
        response.writeHead(200, {'Content-Type': 'image/'+fileExt});
        response.end(file);
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
