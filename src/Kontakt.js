import React, { useState, Fragment } from 'react';
import {useForm} from 'react-hook-form';
import './Kontakt.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon'
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 400,
        },
    button: {
        margin: theme.spacing(1),
      },
  },
}));
const Kontakt = () => {
const classes = useStyles();
const [bedsked, setBedsked] = useState(false);
const { register, handleSubmit, errors} = useForm();


const onSubmit = data => {
  console.log(data);
  axios.post('/kontakt/email', data)
   .then((response) => {
    console.log(response)
  }, (error) => {
    if(error){
    console.log(error);
    }
  });
  setBedsked(true);
}

const handleSubmi = (e) => {
e.preventDefault();
e.target.reset();
}



return(
<div>
<div className="container">
<div className="kontakt-info">
<p>IT-Arbejde.dk er Danmarks største samling af IT-jobs, vores mission er at udbyde et stort kategoriseret udvalg af arbejde indenfor IT-sektoren i Danmark. <br></br>
Vi vil gerne være de førende indenfor IT-arbejde, og udbyde flere og flere jobs indenfor IT.  <br></br>Vi opdatere dagligt vores joboversigt, med de nyeste jobs indenfor IT branchen.
</p>
</div>
<div className="kontakt-form">
<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmi}>
<div className="form-container">
<h1>KONTAKT</h1>
<p>Hvis du har spørgsmål, vedrørende annoncering eller andre ting. Er du velkommen til at kontakte os for neden.</p>
<p className="mobil-kontakt">Alt kontakt foregår over e-mail på itarbejde@outlook.dk</p> 
<TextField
          id="standard-full-width"
          label="Dit navn"
          name="firstName"
          inputRef={register({ required: true })}
          margin="normal"
        />
{errors.firstName && <p className="fejl-bedsked">Du mangler at udfylde et felt!</p>}
        <TextField
          id="standard-helperText"
          label="Din email"
          name="email"
          inputRef={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          })}
        />

      {errors.email &&<p className="fejl-bedsked">Du mangler at udfylde et felt!</p>}
        <TextField
          id="standard-helperText"
          name="subject"
          label="Emne"
          inputRef={register({ required: true })}
        />
  {errors.subject && <p className="fejl-bedsked">Du mangler at udfylde et felt!</p>}
            <TextField
          id="outlined-multiline-flexible"
          label="Bedsked"
          multiline
          name="message"
          rowsMax={4}
          inputRef={register({ required: true })}
          variant="outlined"
        /> 
      {errors.message && <p className="fejl-bedsked">Du mangler at udfylde et felt!</p>}
        <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>

      {bedsked === true ?
      <Alert className="validation" severity="success">Din e-mail er blevet sendt!</Alert>
       :<Fragment></Fragment>}
      </div>

    </form>
</div>
</div>
</div>
)
}


export default Kontakt