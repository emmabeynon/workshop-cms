var http = require('http');
var fs = require('fs');

var message = 'Hiiii There!!';
var nodeMessage = "This is node!";
var girlsMessage = "This is girls!";

function handler (request, response){
  var url = request.url;
  console.log(url);
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
}

var server = http.createServer(handler);

server.listen(3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");

});
