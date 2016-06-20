// YOUR CODE HERE:
var app = {
  username: 'hien',
  text: 'hey',
  roomname: 'hey'
};

app.init = function () {
  return true;
};

app.send = function () {
  return true;
};

var data;

$(document).ready(function() {
  // $.ajax({
  //   url: 'https://api.parse.com/1/classes/messages',
  //   data: JSON.stringify(app),
  //   type: 'POST',
  //   success: function() {
  //     console.log('post success');
  //   },
  //   error: function() {
  //     console.log('post rejected');
  //   }
  // });
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    dataType: 'json',
    data: data,
    // contentType: 'application/json', 
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
});