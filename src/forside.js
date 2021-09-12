import React, { useState, useEffect } from 'react';
import './forside.css';
import Jobs from './jobs';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import dk from './dk.json';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {Pagination} from '@material-ui/lab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Forside = () => {
const classes = useStyles();
const [job, setJob] = useState([]);
const [loading, setLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [postPerPage] = useState(14);
const [inputValue, setInputValue] = React.useState('');
const [keyWord, setKeyWord] = useState('');
const [values, setValues] = React.useState(0);
 

useEffect(() => {
  async function fetchData (){
  setLoading(true);
  const resp = await fetch("/api/jobs");
  const data = await resp.json();
  setJob(data);
  setLoading(false); 
  }
  fetchData();
  }, [])

const skiftTabValue = (event, newValues) => {
    setValues(newValues);
  };
  const changeKeyword = (e) =>{
    e.preventDefault();
    setKeyWord(e.target.value)
  }   
  const handleChange = (event, value) => {
   setCurrentPage(value);
  }

const skiftSide = (number) => {
setCurrentPage(number);
}

const getJobs = async (funktion) => {
setLoading(true)
const res = await fetch(`/api/${funktion}`);
setJob(await res.json());
setLoading(false);
}

let LokationFilter = job.filter(job => {
  let regex = new RegExp(`${inputValue}`,'gi');
 return job.Lokation.match(regex);
})
let KeywordFilter = LokationFilter.filter(job => {
  let SecondRegex = new RegExp(`${keyWord}`, 'gi')
  return job.Titel.match(SecondRegex);
})

const indexOfLastPost = currentPage * postPerPage;
const indexOfFirstPost = indexOfLastPost - postPerPage;
const currentPosts = KeywordFilter.slice(indexOfFirstPost, indexOfLastPost);


return (
<div className="App">
<div className="header">
<div className="input">
  <div className="lokation">
    <h3>
    Hvor
    </h3>
    <p>By eller område</p>
  <Autocomplete
  className="LokationInput"
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={dk.map(by => by.city)}
        renderInput={(params) => <TextField  {...params} label="Lokation" variant="outlined" />}
      />

      </div>

  <div className="keyword">
    <h3>Keyword</h3>
    <p>Stilling eller programmeringsprog</p>
  <TextField id="outlined-basic" label="Keyword" variant="outlined" onChange={changeKeyword}/>
    </div>
    </div>
</div>
<div className={classes.root}>
<AppBar className="bar" position="static" color="default">
  <Tabs value={values} onChange={skiftTabValue} aria-label="scrollable auto tabs example" scrollButtons="auto" variant="scrollable" textColor="primary">
    <Tab onClick={() => getJobs('jobs')} label="Software" {...a11yProps(1)} />
    <Tab onClick={() => getJobs('c')} label="C#" {...a11yProps(2)} /> 
    <Tab onClick={() => getJobs('net')} label=".NET" {...a11yProps(3)} />
    <Tab onClick={() => getJobs('java')} label="JAVA" {...a11yProps(4)} />
    <Tab onClick={() => getJobs('python')} label="PYTHON" {...a11yProps(5)} />
    <Tab onClick={() => getJobs('javascript')} label="JAVASCRIPT" {...a11yProps(6)} />
    <Tab onClick={() => getJobs('frontend')} label="Frontend" {...a11yProps(7)} />
    <Tab onClick={() => getJobs('backend')} label="Backend" {...a11yProps(8)} />
    <Tab onClick={() => getJobs('fullstack')} label="Fullstack" {...a11yProps(9)} />
    <Tab onClick={() => getJobs('machine')} label="Machine" {...a11yProps(10)} />
    <Tab onClick={() => getJobs('cloud')} label="Cloud" {...a11yProps(11)} />
    <Tab onClick={() => getJobs('junior')} label="Junior" {...a11yProps(12)} />
    <Tab onClick={() => getJobs('senior')} label="Senior" {...a11yProps(13)} />
  </Tabs>
</AppBar>


</div>
      <h2 className="job-oversigt">Der er ligenu <span className="jobs-tilgængelig">{KeywordFilter.length} jobs </span> tilgængelige</h2>
<Jobs data={currentPosts} loading={loading} skiftSide={skiftSide}/>
<Pagination size="large" className="paginate" page={currentPage} onChange={handleChange} count={Math.round(KeywordFilter.length/postPerPage)}/>
</div>
  );
}

export default Forside