
const argv = require('minimist')(process.argv.slice(2));

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

let https = null;

if(argv.useHttps){
   var certOptions = {
      key: fs.readFileSync(path.resolve('server.key')),
      cert: fs.readFileSync(path.resolve('server.crt'))
   };
   https = require('https').Server(certOptions, app);
}
else{
   https = require('http').Server(app);
}


app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
   res.render(__dirname + '/pages/index.html');
});

let listenPort = process.env.PORT || 3000;

let server = https.listen(listenPort, function () {
   let host = server.address().address;
   let port = server.address().port;

   let date = new Date();

   console.log("App listening at http://%s:%s", host, port);
   console.log('Current Time: ' + date);
});
