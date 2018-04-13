var io = require('socket.io-client');
var request = require('request');

var socket = io.connect('https://tenaris-socket.mybluemix.net', {
  reconnect: true
});

socket.on('connect', function() {
  console.log('Connected!');

  socket.on('api-call', function(data) {

    request(data.data, function(err, result, body) {
      var data = this.data;

      socket.emit(data.token, {
        err: err,
        result: body
      })
    }.bind({
      data: data
    }))

  })
});
