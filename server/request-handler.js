var fs = require('fs');
var url = require('url');
var path = require("path");

var messages = {results:[]};

var staticBasePath = './client';

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

   if (request.url === '/classes/messages'){

      //static render *TO-DO*
      // var resolvedBase = path.resolve(staticBasePath);
      // var safeSuffix = path.normalize(request.url).replace(/^(\.\.[\/\\])+/, '');
      // var fileLoc = path.join(resolvedBase, safeSuffix);

      // var stream = fs.createReadStream(fileLoc);

      //   // Handle non-existent file
      //   stream.on('error', function(error) {
      //       response.writeHead(404, 'Not Found');
      //       response.write('404: File Not Found!');

      //   });

      //   // File exists, stream it to user
      //   response.statusCode = 200;
      //   stream.pipe(response);
        //end static render

     if(request.method === 'GET'){
        response.writeHead(200, headers);
        var data = JSON.stringify(messages);
        response.end(data);
      }

      else if (request.method ==='POST'){
        statusCode = 201;
        response.writeHead(statusCode, headers);

        request.on('data', chunk => {
          var obj ='';
          obj+= chunk;
          var res = JSON.parse(obj);
          res.createdAt = new Date();
          res.objectId = genID(JSON.stringify(res));
          if (!exists(res.objectId)){
            messages.results.push(res);
          }

        });
        response.end(JSON.stringify(messages.results));
      }
       else if (request.method ==='OPTIONS'){
       }
       else if (request.method ==='PUT'){
       }
       else if (request.method ==='DELETE'){
       }

    } else {
        statusCode=404;
        response.writeHead(statusCode, headers);
        response.end();
    }

}; //end request handler

var exists = (id) => {
  for (var i =0;i<messages.results.length;i++){
    if (messages.results[i].objectId === id){
      return true;
    }
  }
  return false;
}

var genID = (str) => {
  var str = str.split('').sort().slice(0,18).join('');
  var hash = 0, i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  hash = hash.toString(12);
  var res = '';
  var alpha = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
  for (var i=0;i<hash.length;i++){
      if(parseInt(hash[i])){
          res+= alpha[hash[i]];
      } else {
          res+=hash[i];
      }
  }
  return res;

};

//url http://127.0.0.1:3000/
//msg format createdAt: "2018-10-05T22:48:50.106Z"
/*
objectId: "eJQikOUSc2"
roomname: "lobby"
text: "asdfasdf"
updatedAt: "2018-10-05T22:48:50.106Z"
username: "anonymous"
*/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};



module.exports.requestHandler = requestHandler;
