import React, {useState,useEffect} from 'react';
import RateReviewIcon from '@material-ui/icons/RateReview';
import imagemovie from '../images/movie.png';
import {TextField, Button, TableHead, TableRow, TableCell, TableBody} from '@material-ui/core';
import Review from './Review';
import Notificaciones from './Notificaciones';
import pusher from '../services/pusher_service';

function Customer(props) {

  const [name1, setName1] = useState('');;
  const [year, setYear] = useState('');
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState('');
  const [pickupAddress,setPickupAddress] = useState('');
  const [dropoffAddress,setDropoffAddress] = useState('');
  const [prueba,setPrueba] = useState('');
  
  const submitBookingRequest = async () => {
    const res = await fetch("http://localhost:3000/api/movies", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name1: name1,
          year1: year
        })
    })
    const response = await res.json();
    setMovies(response);

    var resetname = document.getElementById("Movie Name");
    resetname.value = " ";
    var resetyear = document.getElementById("Year");
    resetyear.value = "";

  }

  useEffect( () => {
    var channel = pusher.subscribe(`events_to_be_shown`);
    channel.bind('review', function(data) {
      setPickupAddress(data.user);
      setDropoffAddress(data.stars);
      setPrueba(data.review)
    });
  }, [props]);

  function logOff(){
    localStorage.removeItem('token');
    window.location.replace("http://localhost:4000/")
  }
  
  const mystlye1 = {
    minWidth: "30%",
    minHeight: 50,
    top: 20,
    right: "-5%"
  };

  const mystlye2 = {
    minWidth: "30%",
    minHeight: 50,
    top: 20,
    right: "-7%"
    
  };

  const mystlye3 = {
    minWidth: "30%",
    minHeight: 50,
    marginTop: 40,
  };

  const styletable = {
     width: "100%",
     marginTop:20
  };

  const styleimage = {
    backgroundImage: imagemovie
  }
  const botonlogoff = {
    left: "150px",
    bottom: "100"
  }

  function review(movie){
    console.log("entro 1");
    console.log(movie.id);
    setMovie(movie);
  }


  return (
    <div style={styleimage}>
      {movie && <Review rev={movie} /> } 
      <center>
        <Notificaciones></Notificaciones>
      <div> 
      <TextField
            id="Movie Name"
            //value={name1}
            onChange={(ev) => setName1(ev.target.value)}
            label="Movie Name"
            variant="outlined"
            style={mystlye1}
        />
      <TextField
            id="Year"
            //value={year}
            onChange={(ev) => setYear(ev.target.value)}
            label="Year"
            variant="outlined"
            style={mystlye2}
        />
      <Button
            style={botonlogoff}
            id="submit-button"
            onClick={() => logOff()}
            variant="outlined"
            size="large"
            color="primary"
            >
        Logoff
      </Button>
      </div>
      
      <div>
      <Button
            id="submit-button"
            onClick={() => submitBookingRequest()}
            variant="outlined"
            size="large"
            color="primary"
            style={mystlye3} >
        Search
        </Button>
      </div>
      </center>
      <br/>
      <table style={styletable}>
        <TableHead style={{backgroundColor: "#00B1E1"}}>
          <TableRow>
          <TableCell>Poster</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Año</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>RT Rating</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Calificar</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody style={{backgroundColor: "#F6BB42"}}>
            {movies.map((movie) =>
              <TableRow className="data-row">
                <TableCell><img src={movie.posterMovie}height="25%"/></TableCell>
                <TableCell>{movie.nameMovie}</TableCell>
                <TableCell>{movie.yearMovie}</TableCell>
                <TableCell>{movie.directorMovie}</TableCell>
                <TableCell>{movie.ratingMovie}</TableCell>
                <TableCell>{movie.plotMovie}</TableCell>
                <TableCell> <Button variant="outlined" onClick={() => review(movie)}> 
                 <RateReviewIcon/> </Button> </TableCell> 
              </TableRow>
            )}
        </TableBody>
      </table>

    </div>
  );
}

export default Customer;