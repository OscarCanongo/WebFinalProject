import React, {useState, useEffect} from 'react';
import {Card, CardHeader, CardContent, Button, CardActions} from '@material-ui/core';
import pusher from '../services/pusher_service';

function Driver(props) {
  const [user,setUser] = useState('');
  const [stars,setStars] = useState('');
  const [show,setShow] = useState(false);
  const [review,setReview] = useState('');
  const [movie,setMovie] = useState('');
 
  useEffect( () => {
    const channel = pusher.subscribe('chat');
    channel.bind('message', function(data) {
      console.log("La data: ")
      console.log(data);
      setUser(data[0]);
      setStars(data[1]);
      setReview(data[2]);
      setMovie(data[3]);
      setShow(true);
    });
  }, [props]);

   return (
    <div>
      {
        show ?
        <Card>
          <CardHeader title="Review"/>
          <CardContent>
      El usuario: <b>{user}</b> escribió <b>{review}</b> y calificó con <b>{stars}</b> estrellas a la pelicula <b>{movie}</b>
          </CardContent>
        </Card>
        : null
      }
    </div>
  );
}
 
export default Driver;