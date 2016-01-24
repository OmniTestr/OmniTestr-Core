var express = require('express');
var wagner = require('wagner-core');
var path = require('path');
var ws = require('ws');

require('./models')(wagner);

var app = express();
app.set('view engine', 'jade');

wagner.invoke(require('./auth'), {app: app});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./views')(wagner));
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000');
