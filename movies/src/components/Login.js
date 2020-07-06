import React, {useState} from 'react';
import {TextField, Button, DialogContentText,} from '@material-ui/core';

function Login(props) {

  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  
  const submitLogin = async () => {
    const res = await fetch("http://localhost:3000/api/login/enter", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          nombre: nombre,
          password: password
        })
    })
    const response = await res.json();

    if(response != undefined){
      localStorage.setItem('token', response)
      console.log(response);
      
      window.location.replace("http://localhost:4000/main")
 }
    else{
        console.log("error")
    }
   

  }

  return (
    <div >
     <br>
     </br>
     <br>
     </br>
    
    <center>
        <div>
        <DialogContentText>
            Usuario
        </DialogContentText>
        <TextField
            id="nombre"
            //value={year}
            onChange={(ev) => setNombre(ev.target.value)}
            label="Nombre"
            variant="outlined"
        />
    </div>
    <br>
    </br>
    <div>
        <DialogContentText>
            Contraseña
        </DialogContentText>
        <TextField
            id="password"
            //value={year}
            onChange={(ev) => setPassword(ev.target.value)}
            label="Password"
            variant="outlined"
        />
    </div>
    <br>
    </br>
    <div>
        <Button
            id="submit-button"
            onClick={() => submitLogin()}
            variant="outlined"
            size="large"
            color="primary"
            >
        Login
        </Button>
    </div>

    </center>
    
    </div>
  );
}

export default Login;