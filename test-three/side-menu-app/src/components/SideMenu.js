import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Logo from '../images/Logo.png';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
// icons (material ui)
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
// components
import CollapsableMenuItem from './CollapsableMenuItem';
import SimpleMenuItem from './SimpleMenuItem';
import '../styles/style.css';



const useStyles = makeStyles((theme) => ({
  root: {
    height: 90,
    marginTop: '20px',
    marginBottom: '20px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor:"rgb(51,51,51)",
  },
  input: {
    color: "white",
    fontSize: 20,
    marginTop: '-20px',
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  clientId: {
    textAlign: "left",
    marginBottom:'0px', 
    fontSize: "15px", 
    color: "grey",
  },

}));


// Basic outline of the side bar menu with static/hard-coded elements like user name, searchbar, brand logo etc.
// Uses other components to build collapsable/non-collapsable menu items.
export default function SideMenu({MenuItems}) {
  
  const classes = useStyles();

  return (
    <div className="sideBarSeparate">
      <List component="nav"
        subheader={
          <ListSubheader component="div">
            <img className="Logo" src={Logo} alt="MoshtixLogo" />
          </ListSubheader>
        } 
      >
        <div className="userContainer">
          <PersonOutlineOutlinedIcon className="userIcon"/><div className="userName">Zenon M.</div>
        </div>
        <Paper component="form" className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu" />
          <div>
            <p className={classes.clientId}>Client 34594</p>
            <InputBase
              className={classes.input}
              placeholder="Oxford art Factory (Gal)"
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {MenuItems.children.map(({ name, children: subItems}) => (
          <React.Fragment key={name}>
            {Array.isArray(subItems) ? (
              <CollapsableMenuItem name={name} subItems={subItems}/>    
            ) :  
              <SimpleMenuItem name={name}/>
            }
          </React.Fragment>
        ))} 
      </List>

      <div className="getSupport">
        <HelpOutlineOutlinedIcon className="supportIcon"/>
        <div className="userName">Get Support</div>
      </div>
    </div>
  );
}
