import React, {useState,useEffect} from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import imagemovie from '../images/movie.png';
import {TextField, Button, TableHead, Dialog, DialogTitle, DialogContent, DialogContentText,
  TableRow, TableCell, TableBody, DialogActions} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import pusher from '../services/pusher_service';
import Notificaciones from './Notificaciones';

function Review(props) {

  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(-1);
  const [movie, setMovie] = useState(props.rev);
  const [review, setReview] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [nombrereviewer, setNombreReviewer] = useState('');
  const [open, setOpen] = React.useState(true);
  const [allreviews, setAllreviews] = useState([]);
  const [value1, setValue1] = React.useState(movie.ratingMovie);
  const [pickupAddress,setPickupAddress] = useState('');
  const [dropoffAddress,setDropoffAddress] = useState('');
  const [prueba,setPrueba] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };

    useEffect( () => {
      var channel = pusher.subscribe(`events_to_be_shown`);
      channel.bind('review', function(data) {
        setPickupAddress(data.user);
        setDropoffAddress(data.stars);
        setPrueba(data.review)
      });
    }, [props]);
  
  const submitReview = async () => {
    const res = await fetch("http://localhost:3000/api/review", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id1: movie.id,
          pelicula: movie.nameMovie,
          review1: review,
          stars1: value,
          estrellas1: movie.ratingMovie,
          reviewer1: nombrereviewer,
          reviewerId: reviewer
        })
    })
    
    var resetname = document.getElementById("Movie Name");
    resetname.value = " ";
    var resetyear = document.getElementById("Year");
    resetyear.value = "";

  }

  useEffect(() => {
    const gettoken = localStorage.getItem('token')

    
      fetch("http://localhost:3000/api/login/prueba", {
        method: "GET",
        headers: {
          'authorization': `Bearer ${gettoken}`
        }
      }).then(response => response.json()
      ).then(json => setReviewer(json.id));

      fetch("http://localhost:3000/api/login/getnombre", {
        method: "GET",
        headers: {
          'authorization': `Bearer ${gettoken}`
        }
      }).then(response => response.json()
      ).then(json => setNombreReviewer(json.nombre));

    console.log(nombrereviewer)
    
  
    const getReviews = async() => {  
      const res = await fetch("http://localhost:3000/api/review/getreviews", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id1: movie.id,
            review1: review,
            stars1: value,
            estrellas1: movie.ratingMovie
          })
      })
      const response = await res.json();

      //console.log(response)


      setAllreviews(response);
  
    }

    getReviews();
  })

  

  function calificar (){
    submitReview();
    handleClose();
  }

  const handleClose = () => {
    setOpen(false);
    var resetname = document.getElementById("Movie Name");
    resetname.value = " ";
    var resetyear = document.getElementById("Year");
    resetyear.value = ""
  };
  
  const styletable = {
     width: "100%",
     marginTop:20
  };

  const stylebox = {
    //border: "15%",
    width: "100%"
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
    },
    media: {
      maxWidth: '30%',
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    stars:{

    },
  }));
  
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  return (
    <div style={stylebox}>
      
      <div style={stylebox} >
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Review</DialogTitle>
      <DialogContent>
          <Notificaciones></Notificaciones>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar alt="Remy Sharp" src="https://www.thewrap.com/wp-content/uploads/2018/08/RottenTomatoes.jpg" />
            }
            action={
              <Box component="fieldset" mb={3} borderColor="transparent">
                  <br></br>
                  <br></br>
                  <Rating name="read-only" value={value1} readOnly />
                </Box>
            }
            title={movie.nameMovie}
            subheader={movie.directorMovie}
          />
          <table>
            <TableHead>
              <TableRow>
              <TableCell>
              <img src={movie.posterMovie}height="30%"/>
              </TableCell>
                <TableCell>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {movie.plotMovie}
                    </Typography>
                  </CardContent>
                </TableCell>
              </TableRow>
            </TableHead>
          </table>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <DialogContentText>
                Selecciona las estrellas para calificar
              </DialogContentText>
              <div className={classes.root}>
              <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
            // {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
            //esto dede de ir abajo
              />
            </div>
            <div>
                  <DialogContentText>
                    Escribe tu reseña
                  </DialogContentText>
                  <TextField
                    id="Year"
                    //value={year}
                    onChange={(ev) => setReview(ev.target.value)}
                    label="Review"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                />
            </div>
            <table style={styletable}>
            <TableHead>
              <TableRow>
              <TableCell align="center">Reseña</TableCell>
                <TableCell align="center">Estrellas</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
                {allreviews.map((allreview) =>
                  <TableRow className="data-row2">
                    <TableCell align="center">{allreview.reviews}</TableCell>
                    <TableCell align="center">
                      <Box component="fieldset" mb={3} borderColor="transparent">
                        <br></br>
                        <br></br>
                        <Rating name="read-only" value={allreview.estrellas} readOnly />
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </table>
          </Collapse>
        </Card>
     </DialogContent>
      <DialogActions>
            <Button  size="medium" label="Cancelar" onClick={handleClose} >
              Cancelar
            </Button>
            <Button id="submit-button"
                onClick={() => calificar()}
                size="large"
                size="medium" label="Review">
                Calificar
            </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}

export default Review;