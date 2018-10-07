var fs = require("fs");
var url = require("url");
var path = require("path");
var http = require("http");
var mimeTypes = {
  "html": "text/html",
  "jpeg": "image/jpeg",
  "js": "text/javascript",
  "css": "text/css"
};

var results = require("./results");
var messagesLog = results;

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;

  var requestPath = url.parse(request.url).pathname;
  if (requestPath === '/'){
    response.writeHead(303, {Location: '/client/index.html'});
    response.end();
  } else if (requestPath.startsWith('/client')) {
    var mimeType = mimeTypes[requestPath.split('.').pop()];
    if (!mimeType) { mimeType = 'text/plain';}
    response.writeHead(200, { "Content-Type": mimeType });

    fs.readFile('.' + requestPath, (err, data) => {
      if (err) {console.log(err.message || err); }
      response.end(data);
    });
  } else if (requestPath === '/classes/messages'){
    if(request.method === 'GET'){
        response.writeHead(200, headers);
        var data = JSON.stringify(messagesLog);
        response.end(data);
    } else if (request.method ==='POST'){
        statusCode = 201;
        response.writeHead(statusCode, headers);

        request.on('data', chunk => {
          var obj ='';
          obj+= chunk;
          var res = JSON.parse(obj);
          res.objectId = genID(JSON.stringify(res.username+res.text+res.createdAt));
          res.roomName = 'lobby';
          res.createdAt = new Date();
          res.updatedAt = res.createdAt;

          var chk = exists(res.objectId);
          if (chk>-1){
            console.log('id exists, updating existing msg');
            res.createdAt = messagesLog.results[chk].createdAt;
            messagesLog.results.splice(chk,1);
            res.updatedAt = new Date();
          }
          messagesLog.results.push(res);

        });
        var resArr = JSON.stringify(messagesLog);
        response.end(resArr);
    } else if (request.method ==='OPTIONS'){
    } else if (request.method ==='PUT'){
    } else if (request.method ==='DELETE'){
    }
  } else {
    statusCode=404;
    response.writeHead(statusCode, headers);
    response.end();
  }

}; //end request handler

var exists = (id) => {
  for (var i =0;i<messagesLog.results.length;i++){
    if (messagesLog.results[i].objectId === id){
      return i;
    }
  }
  return -1;
}

var genID = (str) => {
  var str = str.split('').slice(0,18).join('');
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

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type':'application/json'
};

module.exports.requestHandler = requestHandler;
