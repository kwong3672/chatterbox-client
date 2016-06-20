// YOUR CODE HERE:
var app = {
  username: 'hien',
  text: 'hey',
  roomname: 'hey'
};

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
        var $msg = '<div>' + message.username + ':' + message.text + '</div>';
        $('#chats').append($msg);
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

var data;

$(document).ready(function() {
  
  app.init();


});