var express = require('express');
var wagner = require('wagner-core');
var path = require('path');
var server = require('http').createServer();
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({
	server: server
});

server.listen(4080, function() {'listening'});


require('./models')(wagner);

var app = express();
app.set('view engine', 'jade');

wagner.invoke(require('./auth'), {app: app});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./views')(wagner));
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000');

wss.broadcast = function broadcast(data) {
    if (wss.clients) {
        console.log("sending data to clients");
        wss.clients.forEach(function each(client) {
          client.send(data);
        });
      } else {
        console.log("no client");
      }
};

wss.on('connection', function connection(ws) {
	console.log("connection established!");

	ws.on('message', function incoming(message) {
    console.log("data received: " + data);
    if (data === "DONE") {
        //DO NEXT SLAVE
    } else {
        data = JSON.parse(data);
        //is final summary of good + bad and time
        if (data.nFailed) {
            var resourceName = data.resource;
            var errorRate = data.nFailed / (data.nFailed + data.nSuccess);
            var averageTime = data.time;
            resourceTable.resourceName = {
                error: errorRate,
                time: averageTime
            };
            //updates the master every 10 sec with status codes
        } else if (data.time % 10 == 0 && data.codes) {

            if (frequencyBin[data.time]) {
                for (code in data.codes) {
                    if (frequencyBin[data.time].code) {
                        frequencyBin[data.time].code += data.codes.code;
                    } else {
                        frequencyBin[data.time].code = data.codes.code;
                    }
                }
            } else {
                frequencyBin[data.time] = data.codes;
            
        }
    }
        //updates the counter histogram every 5 ms
        else if (data.time % 5 == 0 && data.count) {
            var strTime = String(data.time);
            if (reqPerTime[strTime]) {
                reqPerTime[strTime] += data[count];
            } else {
                reqPerTime[strTime] = data[count];
            }
        } else {
            for (code in data) {
                if (totalStatusCode[code]) {
                    totalStatusCode[code] += data[code];
                } else {
                    totalStatusCode[code] = data[code];
                }
            }
        }
    }
});

//  {
//      '404':200,
//      '200':213,
//       ...
//  }
var totalStatusCode = {};

//{   'google.com/ahrep':
//        {
//            error: 0.134124,
//            time: 132.122141
//        },
//    'google.com/kfljkdskafdjsal':
//        {
//            error: 0.134124,
//            time: 132.122141
//        }
//}
var resourceTable = {};


//  {
//      '404':200,
//      '200':213,
//       ...
//  }
var frequencyBin = {};


//  {
//      '5':23,
//      '10':42,
//      '15':42,
//       ...
//  }
var reqPerTime = {};

});


module.exports = wss;
