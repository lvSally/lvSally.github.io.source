/* eslint-disable */
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');

var app = express();

app.use('/api', proxy('https://dev-bach.cmpz.com', {
  proxyReqPathResolver: (req, res) => {
    return '/api' + require('url').parse(req.url).path;
  }
}));

app.use(express.static(path.join(__dirname + '/dist'), {maxAge: 3600 * 1000}));
app.use('*', function (req, res){
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
})


module.exports = app.listen(8000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('App is running on port %s', 8000);
})
