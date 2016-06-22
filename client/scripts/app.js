// YOUR CODE HERE:
var data;
var app = {};
var roomList = {};

var convertSpecialCharacters = function (mystring) {
  if ( mystring === undefined || mystring === null ) {
    return undefined;
  }
  return mystring.replace(/&/g, '&amp;')
  .replace(/>/g, '&gt;')
  .replace(/</g, '&lt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;')
  .replace(/ /g, '_')
  .replace(/#/g, '&#35;')
  .replace(/\(/g, '&#40;')
  .replace(/\)/g, '&#41;')
  .replace(/\;/g, '&#59;')
  .replace(/\./g, '&#46;');
  // .replace(/ /g, "&nbsp;")
};

var displayMessage = function (message) {
  // message.roomname = message.roomname || 'none';
  // var room = message.roomname.split(' ').join('_');
  // message.username = message.username || 'anonymous';
  // var user = message.username.split(' ').join('_');
  var room = convertSpecialCharacters(message.roomname) || 'none';
  var user = convertSpecialCharacters(message.username) || 'anonymous';
  var text = convertSpecialCharacters(message.text) || '';
  // room = message.roo  var $msg = '<div class=' + user + '>' + user + ':' + text + '</div>';t;
  app.addRoom(room);
  var $msg = $('<div></div>');
  $msg.text(user + ' : ' + text)
    .attr('class', room)
    .addClass(user)
    .addClass('message');

  // $('#' + room).prepend($msg);
  $('#all').prepend($msg);
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
        displayMessage(message);
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
    ifModified: true,
    // contentType: 'application/json', 
    success: function(data) {
      $('#all').html('');
      _.each(data.results, function(message) {
        displayMessage(message);
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
  // var $msg = '<div>' + msg.username + ':' + msg.text + '</div>';
  // $('#chats').prepend($msg);
  displayMessage(msg);
};

app.addRoom = function (room) {
  // need to fix error where if room name = room.name makes too many 
  if ( !roomList[room] ) {
  // var $room = $('<div></div>');
  // $room.attr('id', room);
  // if ( $($room) === undefined ) {
  //   $('#roomSelect').append($room);
    // add to the dropdown if room does not exist
    var $option = $('<option></option>');
    $option.attr('value', room);
    $option.text(room);
    $('select').append($option);
    roomList[room] = true;
  }
  // }


};

app.addFriend = function (friend) {
  // friend.addClass('friend');

  $('.' + friend).addClass('Friends'); 
  console.log(friend);
};

app.handleSubmit = function () {
  var text = $('input').val();
  var message = {
    username: 'me',
    roomname: 'lobby',
    text: text
  };
  app.addMessage(message);
};

app.selectRoom = function (room) {
  // loop through all of options and turn off all display for non-selected
  if ( room === 'All' ) {
    $('.message').css('display', 'block');
  } else {
    $('.message').css('display', 'none');
    $('.' + room).css('display', 'block');
  }
  // $('#' + room).css('display', 'block');
  // console.log($('#roomSelect').find(":selected").val());
  // console.log($('#roomSelect option:selected').val());

  // var temp = this.find(":selected");

  // console.log(temp);
};


$(document).ready(function() {
  app.init();
  setInterval(app.fetch, 5000);
  $('select').on('change', function() {
    var room = $('option:selected').text();
    app.selectRoom(room); 
  });

});

$(document).on('click', '.message', function() {
  console.log(this);
  app.addFriend(this.classList[1]);
});

$(document).on('click', '.button', app.handleSubmit);


