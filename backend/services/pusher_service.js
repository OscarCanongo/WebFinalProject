var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '1009293',
  key: '2300a02c2ef4840f578b',
  secret: 'b093e09915ce9891d56f',
  cluster: 'us2',
  encrypted: true
});

module.exports = pusher;