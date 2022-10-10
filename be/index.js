/*const app = require('express')();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

http.listen(3000, () => {
  console.log('listeninghttp on *:3000');
});*/

const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    // update according to the vue app
    // origins: ['http://localhost:8080']
    origins: ['http://127.0.0.1:5174']
  }
});

app.use(cors())

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

var notificationCount = 0;
var notificationInterval = null;
var notificationList = [];

io.on('connection', (socket) => {
  console.log('a user connected');
  // startNotification()
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('fe message', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('start notifications', () => {
    notificationList = [];
    notificationCount = 0
    notificationInterval = setInterval(triggerNotification, 5000);
  })

  // io.emit('be message','Hello there from Node')
});
// var notificationCount = 0;
// let notificationInterval = setInterval(triggerNotification, 900);

function startNotification() {
  notificationCount = 0
  notificationInterval = setInterval(triggerNotification, 90000);
}

function triggerNotification() {
  if(notificationCount>9){
    console.log('Reached 10')
    clearInterval(notificationInterval)
    notificationInterval = null;
    // io.disconnect();
  }
  io.emit('notification started', prepareNotificationList());
}

function prepareNotificationList() {
  // notificationList.unshift(`New notification from app ${Math.ceil(Math.random()*10)}`)
  notificationList.unshift({
    id: notificationCount+1,
    notification: `New notification from app ${Math.ceil(Math.random()*10)}`,
    status: 'Unread'
  })
  return {
    count: ++notificationCount,
    list: notificationList
  }
}

http.listen(3000, () => {
  console.log('listening on *:3000');
});