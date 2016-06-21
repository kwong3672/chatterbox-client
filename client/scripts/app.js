// YOUR CODE HERE:
var data;
var app = {};

app.init = function () {
  // AJAX get messages from api
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    dataType: 'json',
    data: data,
    // contentType: 'application/json', 
    success: function(data) {
      _.each(data.results, function(message) {
        message.roomname = message.roomname || 'none';
        var room = message.roomname.split(' ').join('_');
        message.username = message.username || 'anonymous';
        var user = message.username.split(' ').join('_');
        if ( !$('#' + room ).length ) {
          var $room = '<div id=' + room + '></div>';
          $('#roomSelect').append($room);
        }
        var $msg = '<div class=' + user + '>' + message.username + ':' + message.text + '</div>';
        $('#' + room).append($msg);
      });
    },
    error: function(data) {
      console.log(data);
    }
  });
};

app.send = function (message) {
  // AJAX Post to API
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    data: JSON.stringify(message),
    type: 'POST',
    success: function() {
      console.log('success');
    },
    error: function() {
      console.log('post rejected');
    }
  });
};

app.fetch = function () {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    dataType: 'json',
    data: data,
    // contentType: 'application/json', 
    success: function(data) {
      _.each(data.results, function(message) {
        var $msg = '<div class="chatdiv">' + message.username + ':' + message.text + '</div>';
        $('#chats').append($msg);
      });
      return app.server;
    },
    error: function(data) {
      console.log(data);
    }
  });
};

app.server = 'https://api.parse.com/1/classes/messages';

app.clearMessages = function () {
  $('#chats').html('');
};

app.addMessage = function (msg) {
  app.send(msg);
  var $msg = '<div>' + msg.username + ':' + msg.text + '</div>';
  $('#chats').append($msg);
};

app.addRoom = function (room) {
  if ( !$('#' + room ).length ) {
    var $room = '<div id=' + room + '></div>';
    $('#roomSelect').append($room);
  }
};

app.addFriend = function (friend) {
  // friend.addClass('friend');
  // friend.
  var name = friend.classList[0];
  $('.' + name).addClass('addFriend'); 
  console.log(friend);
};



$(document).ready(function() {
  app.init();
});

$(document).on('click', '#roomSelect > div > div', function() {
  app.addFriend(this);
});






