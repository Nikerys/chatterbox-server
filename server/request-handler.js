var utils = require('./utils');

var objectId = 1;
var messages = [
  {
    text: 'Do my bidding!',
    username: 'Jono',
    objectId: objectId
  }
];

var actions = {
  'GET': function(request, response) {
    utils.sendResponse(response, {results: messages});  
  },
  'POST': function(request, response) {
    utils.collectData(request, function(message) {
      messages.push(message);
      message.objectId = ++objectId;
      utils.sendResponse(response, {objectId: 1}, 201);  
    });
  },
  'OPTIONS': function(request, response) {
    utils.sendResponse(response, null);  
  }
};

var requestHandler = function(request, response) {
 

  var statusCode = 200;
  var statusClientSideErr = 404;
  var errorMsg = '<!doctype html><html><head><title>404</title></head><body>404: Resource Not Found</body></html>';
  var statusCodeOnPost = 201;
  var qs = require('querystring');

  //////////////////////////////////////////////////////////////
//if request method/type(?) is GET 
////if request URL equal to '/classes/messages' (or full URL? not sure)
//////utilize built-in function writeHead for response accepting status code and header
//////send the data to cliend using '.end' method for response
////if not
//////utilize built-in function writeHead for response accepting client Side Error and header
//////Use built-in function write to let the user know about 404 - resource not found 
//////send the data to cliend using '.end' method for response
//else if request method/type(?) is POST 
//////utilize built-in function writeHead for response accepting statusCodeOnPost and header
//////send the data to cliend using '.end' method for response
//  var results = [];

  var action = actions[request.method];

  if (action) {
    action(request, response);
  } else {
    utils.sendResponse(response, 'Not Found', 404);
  }






  // if (request.method === 'GET') {
  //   if (request.url === '/classes/messages') {
  //     sendResponse(response, messages);
  //     // response.writeHead(statusCode, headers);
  //     // response.end(JSON.stringify(results));
  //   } else {
  //     sendResponse(response, errorMsg, statusClientSideErr);
  //     // response.writeHead(statusClientSideErr, headers);
  //     // response.end(JSON.stringify(errorMsg));
  //   }
  // } else if (request.method === 'POST') {
  //   var requestBody = '';
  //   request.on('data', function(data) {
  //     requestBody += JSON.parse(data);
  //     if (requestBody.length > 1e7) {
  //       sendResponse(response, errorMsg, 413);
  //       // response.writeHead(413, 'Request Entity Too Large', headers);
  //       // response.write(JSON.stringify(errorMsg));
  //       // response.end('<!doctype html><html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>');
  //     }
  //   });
  //   request.on('end', function() {
  //     var chatData = qs.parse(requestBody);
  //     results.push(charData);
  //     sendResponse(response, chatData, statusCodeOnPost);
  //     response.writeHead(statusCodeOnPost, headers);
  //     response.end(JSON.stringify(chatData));   
  //   });
  // }

//////////////////////////////////////////////////////////////////

};

//exports.sendResponse = sendResponse;
exports.requestHandler = requestHandler;
