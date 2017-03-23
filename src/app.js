var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();

console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

// APPROACH 1: Using environment variables created by Docker
// var client = redis.createClient(
//      process.env.REDIS_PORT_6379_TCP_PORT,
//      process.env.REDIS_PORT_6379_TCP_ADDR
// );

// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
//var client = redis.createClient({"host": "localhost", "port": "6379"}); //for local dev. This fails when running in the docker container
var client = redis.createClient("6379", "redis");
console.log("redis client connected");

console.log("couchdb test 1:");
var options = {
  host: 'mycouchdb-1',
  port: 5984,
  path: '/',
  method: 'GET'
};
http.request(options, function(res){
	console.log("logging response");
	console.log(res);
});


app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    res.send('Update 1. This page has been viewed ' + counter + ' times!');
    console.log('This page has been viewed ' + counter + ' times!');
  });
});

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});