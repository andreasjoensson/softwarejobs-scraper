import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Kontakt from './Kontakt';
import Forside from './forside';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Link} from 'react-router-dom';
import './header.css'


const App = () => {
    const [value, setValue] = React.useState(0);

return(
<div>
<div className="header-container">
<h1 className="logo"><span>IT</span> ARBEJDE.DK</h1>
<BottomNavigation
  value={value}
  className="nav"
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
  showLabels
>
  <BottomNavigationAction label="Søg job" component={Link} to="/" icon={<LocationOnIcon />} />
  <BottomNavigationAction label="Kontakt" component={Link} to="/kontakt" icon={<ContactMailIcon/>} />
</BottomNavigation>
</div>     

<Switch>
<Route exact path="/" component={Forside}/>
<Route exact path="/kontakt" component={Kontakt}/>
</Switch>
</div>
)
}

export default App