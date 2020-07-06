import Pusher from 'pusher-js';

var pusher = new Pusher('2300a02c2ef4840f578b', {
    cluster: 'us2',
    forceTLS: true 
 });

export default pusher;