import React from 'react';
import './job.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import location from './location-pin.png'


const Job = ({job}) =>{
    const {Titel, Lokation, Link, Virksomhed} = job;
    return (
      <Grid item xs={3}>
      <a target="none" href={Link} className="job-links">
        <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
        <img alt="" src={location}/>
          {Lokation}
          </Typography>
          <Typography variant="h5" component="h2">
              {Virksomhed}
          </Typography>
          <Typography variant="body2" component="p">
          {Titel}
          </Typography>
        </CardContent>
      </Card>
      </a>
      </Grid>
    );
}

export default Job