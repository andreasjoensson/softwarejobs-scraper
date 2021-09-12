import React from 'react';
import Job from './job';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const Jobs = ({data, loading, skiftSide}) =>{

    if(loading){
    return <div className="class">
      <CircularProgress  color="secondary" />
      </div> 
    } 
    if(data.length <= 0){
      skiftSide(1)
   return <h1 className="intetJob">Der er desværre ingen jobs her.</h1>
    }
return(
<div className="gridContainer">
<Grid container spacing={1}  justify="center" className="grid-container">
<Grid container item xs ={12} spacing={3} justify="center">
{data.map
(
job => <Job key={Math.random(200)} job={job}/>
)}
</Grid>
</Grid>
</div>
)
}

export default Jobs
